"use client"

import Image from "next/image"
import { useState } from "react"
import { PageData } from '@/types/page'
import { submitContactForm } from '@/lib/api'

interface ContactPageContentProps {
  pageData?: PageData
}

type CustomField = {
  id: number
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required: boolean
  options?: string[]
  order: number
}

export default function ContactPageContent({ pageData }: ContactPageContentProps) {
  // Extract content from API sections
  // Debug: Log all sections to see what we're getting
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Page Data:', pageData)
    console.log('All Sections:', pageData?.sections)
    if (pageData?.sections) {
      pageData.sections.forEach((s, idx) => {
        console.log(`Section ${idx}:`, {
          type: s.type,
          id: s.id,
          contentKeys: Object.keys(s.content || {}),
          hasCustomFields: !!(s.content as any)?.customFields,
        })
      })
    }
  }
  
  const contactInfoSection = pageData?.sections?.find(s => {
    const type = s.type?.toLowerCase() || ''
    return type === 'contact_info' || type.includes('contact_info') || type.includes('contact info')
  })
  const contactFormSection = pageData?.sections?.find(s => {
    const type = s.type?.toLowerCase() || ''
    return type === 'contact_form' || type.includes('contact_form') || type.includes('contact form')
  })
  const bannerSection = pageData?.sections?.find(s => {
    const type = s.type?.toLowerCase() || ''
    return type === 'contact_banner' || type === 'banner' || type.includes('banner')
  })
  
  // Debug: Log found sections
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Contact Form Section Found:', contactFormSection)
    console.log('Contact Form Content:', contactFormSection?.content)
    if (!contactFormSection) {
      console.warn('⚠️ Contact Form Section NOT FOUND!')
      console.warn('Available section types:', pageData?.sections?.map(s => s.type))
    }
  }

  // Get content from sections (with fallback to empty object)
  const contactInfoContent = contactInfoSection?.content || {}
  const contactFormContent = contactFormSection?.content || {}
  const bannerContent = bannerSection?.content || {}
  
  // Debug: Log the extracted content
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Contact Form Content Extracted:', contactFormContent)
    console.log('Has customFields:', !!contactFormContent.customFields)
    console.log('Custom Fields:', contactFormContent.customFields)
    console.log('Has subjects:', !!contactFormContent.subjects)
    console.log('Subjects:', contactFormContent.subjects)
    console.log('All content keys:', Object.keys(contactFormContent))
  }

  // Get form configuration
  const enableFirstName = contactFormContent.enableFirstName !== false
  const enableLastName = contactFormContent.enableLastName !== false
  const enableEmail = contactFormContent.enableEmail !== false
  const enablePhone = contactFormContent.enablePhone !== false
  const enableSubject = contactFormContent.enableSubject !== false
  const enableMessage = contactFormContent.enableMessage !== false
  
  const firstNameLabel = contactFormContent.firstNameLabel || 'First Name'
  const lastNameLabel = contactFormContent.lastNameLabel || 'Last Name'
  const emailLabel = contactFormContent.emailLabel || 'Email'
  const phoneLabel = contactFormContent.phoneLabel || 'Phone Number'
  const subjectLabel = contactFormContent.subjectLabel || 'Select Subject?'
  const messageLabel = contactFormContent.messageLabel || 'Message'
  
  const firstNamePlaceholder = contactFormContent.firstNamePlaceholder || ''
  const lastNamePlaceholder = contactFormContent.lastNamePlaceholder || ''
  const emailPlaceholder = contactFormContent.emailPlaceholder || ''
  const phonePlaceholder = contactFormContent.phonePlaceholder || ''
  const messagePlaceholder = contactFormContent.messagePlaceholder || 'Write your message..'
  
  const firstNameRequired = contactFormContent.firstNameRequired !== false
  const lastNameRequired = contactFormContent.lastNameRequired !== false
  const emailRequired = contactFormContent.emailRequired !== false
  const phoneRequired = contactFormContent.phoneRequired === true
  const messageRequired = contactFormContent.messageRequired !== false
  
  const subjects = (contactFormContent.subjects as Array<{ label: string; value: string }>) || []
  const customFields = (contactFormContent.customFields as CustomField[]) || []
  const buttonLabel = contactFormContent.buttonLabel || 'Send Message'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: subjects.length > 0 ? subjects[0].value : 'general',
    message: '',
    customFields: {} as Record<string, any>,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCustomFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [fieldName]: value,
      },
    }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, subject: e.target.value }))
  }

  // Validation helper functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, 1234567890, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      
      // Validate required fields
      if (enableFirstName && firstNameRequired && !formData.firstName.trim()) {
        setSubmitStatus({ type: 'error', message: `${firstNameLabel} is required.` })
        setIsSubmitting(false)
        return
      }
      if (enableLastName && lastNameRequired && !formData.lastName.trim()) {
        setSubmitStatus({ type: 'error', message: `${lastNameLabel} is required.` })
        setIsSubmitting(false)
        return
      }
      if (enableEmail && emailRequired && !formData.email.trim()) {
        setSubmitStatus({ type: 'error', message: `${emailLabel} is required.` })
        setIsSubmitting(false)
        return
      }
      // Validate email format
      if (enableEmail && formData.email && !validateEmail(formData.email)) {
        setSubmitStatus({ type: 'error', message: `Please enter a valid ${emailLabel.toLowerCase()}.` })
        setIsSubmitting(false)
        return
      }
      // Validate phone format if provided
      if (enablePhone && formData.phone && formData.phone.trim() && !validatePhone(formData.phone)) {
        setSubmitStatus({ type: 'error', message: `Please enter a valid ${phoneLabel.toLowerCase()}.` })
        setIsSubmitting(false)
        return
      }
      if (enablePhone && phoneRequired && !formData.phone.trim()) {
        setSubmitStatus({ type: 'error', message: `${phoneLabel} is required.` })
        setIsSubmitting(false)
        return
      }
      if (enableMessage && messageRequired && !formData.message.trim()) {
        setSubmitStatus({ type: 'error', message: `${messageLabel} is required.` })
        setIsSubmitting(false)
        return
      }
      
      // Validate custom fields
      for (const field of customFields) {
        const fieldName = field.name
        const value = formData.customFields[fieldName]
        
        if (field.required) {
          if (!value || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
            setSubmitStatus({ type: 'error', message: `${field.label} is required.` })
            setIsSubmitting(false)
            return
          }
        }
        
        // Validate email format for email custom fields
        if (field.type === 'email' && value && typeof value === 'string' && !validateEmail(value)) {
          setSubmitStatus({ type: 'error', message: `Please enter a valid ${field.label.toLowerCase()}.` })
          setIsSubmitting(false)
          return
        }
        
        // Validate phone format for phone custom fields
        if (field.type === 'tel' && value && typeof value === 'string' && !validatePhone(value)) {
          setSubmitStatus({ type: 'error', message: `Please enter a valid ${field.label.toLowerCase()}.` })
          setIsSubmitting(false)
          return
        }
        
        // Validate number format for number custom fields
        if (field.type === 'number' && value && typeof value === 'string' && isNaN(Number(value))) {
          setSubmitStatus({ type: 'error', message: `Please enter a valid number for ${field.label.toLowerCase()}.` })
          setIsSubmitting(false)
          return
        }
      }

      await submitContactForm({
        name: fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: enableSubject ? (formData.subject || undefined) : undefined,
        message: formData.message,
        customFields: Object.keys(formData.customFields).length > 0 ? formData.customFields : undefined,
      })

      setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: subjects.length > 0 ? subjects[0].value : 'general',
        message: '',
        customFields: {},
      })
    } catch (error: any) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again later.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Extract contact info fields
  const intro = contactInfoContent.intro as string
  const phones = (contactInfoContent.phones as Array<{ value: string }>) || []
  const emails = (contactInfoContent.emails as Array<{ value: string }>) || []
  const address = contactInfoContent.address as string
  const socials = (contactInfoContent.socials as Array<any>) || []

  // Render custom field input
  const renderCustomField = (field: CustomField) => {
    const fieldName = field.name
    const value = formData.customFields[fieldName] || ''

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={fieldName}
            value={value}
            onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
            placeholder={field.placeholder || ''}
            required={field.required}
            rows={3}
            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
          />
        )
      case 'select':
        return (
          <select
            name={fieldName}
            value={value}
            onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
            required={field.required}
            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'radio':
        return (
          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={fieldName}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
                  required={field.required}
                  className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              name={fieldName}
              checked={!!value}
              onChange={(e) => handleCustomFieldChange(fieldName, e.target.checked)}
              required={field.required}
              className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
            />
            <span className="ml-2 text-gray-700">{field.label}</span>
          </label>
        )
      default:
        return (
          <input
            type={field.type}
            name={fieldName}
            value={value}
            onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
            placeholder={field.placeholder || ''}
            required={field.required}
            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
          />
        )
    }
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={bannerContent.image || "/images/Services/Rectangle 52 (5).png"}
            alt="Contact Us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              {bannerContent.title || "Contact Us"}
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              {bannerContent.subTitle || "Get in Touch with Our Team"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="bg-transparent rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] md:items-stretch">
              {/* Left Side - Contact Information */}
              <div className="p-[10px] relative leading-7 md:h-full flex">
                <div className="relative z-10 rounded-xl border border-emerald-500/40 p-[35px] bg-emerald-700 text-white w-full flex flex-col">
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                    <div className="w-full h-full rounded-full bg-emerald-300"></div>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-emerald-100 mb-8 leading-7">
                    {intro ? (
                      intro.split('\n').filter((line: string) => line.trim()).map((line: string, index: number) => (
                        <span key={index}>
                          {line.trim()}
                          {index < intro.split('\n').filter((l: string) => l.trim()).length - 1 && <><br /><br /></>}
                        </span>
                      ))
                    ) : (
                      "Reach out to us for inquiries, support, or project consultations. Our team is available through phone or email to assist you promptly and provide reliable communication every step."
                    )}
                  </p>
                  
                  {/* Phone Numbers */}
                  {(phones.length > 0 || !contactInfoSection) && (
                    <div className="mb-7 flex items-start gap-3">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div className="space-y-3">
                        {phones.length > 0 ? (
                          phones.map((phone, index) => (
                            <p key={index}>{phone.value}</p>
                          ))
                        ) : (
                          <>
                            <p>876.322-1010</p>
                            <p>876.886.3000</p>
                            <p>876.906-1111</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email Addresses */}
                  {(emails.length > 0 || !contactInfoSection) && (
                    <div className="mb-7 flex items-start gap-3">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="space-y-3">
                        {emails.length > 0 ? (
                          emails.map((email, index) => (
                            <p key={index}>{email.value}</p>
                          ))
                        ) : (
                          <>
                            <p>eastlanddbs@hotmail.com</p>
                            <p>eastlanddbs@hotmail.com</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {address && (
                    <div className="mb-10 flex items-start gap-3">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p>{address}</p>
                      </div>
                    </div>
                  )}

                  {/* Social Media Icons */}
                  {socials.length > 0 ? (
                    <div className="flex space-x-4 mt-auto">
                      {socials.map((social: any, index: number) => (
                        <a
                          key={index}
                          href={social.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {social.platform === 'twitter' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          )}
                          {social.platform === 'pinterest' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                            </svg>
                          )}
                          {social.platform === 'youtube' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex space-x-4 mt-auto">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                        </svg>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-[40px] bg-transparent md:h-full flex flex-col">
                {!contactFormSection && process.env.NODE_ENV === 'development' && (
                  <div className="mb-4 p-3 rounded-md text-sm bg-yellow-50 text-yellow-800 border border-yellow-200">
                    ⚠️ Contact Form Section not found. Using default form. Check console for details.
                  </div>
                )}
                {submitStatus.type && (
                  <div className={`mb-4 p-3 rounded-md text-sm ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6 text-sm flex-1">
                  {/* First Name and Last Name */}
                  {(enableFirstName || enableLastName) && (
                    <div className="grid grid-cols-2 gap-8">
                      {enableFirstName && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            {firstNameLabel} {firstNameRequired && '*'}
                          </label>
                          <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required={firstNameRequired}
                            placeholder={firstNamePlaceholder}
                            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                          />
                        </div>
                      )}
                      {enableLastName && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            {lastNameLabel} {lastNameRequired && '*'}
                          </label>
                          <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required={lastNameRequired}
                            placeholder={lastNamePlaceholder}
                            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Email and Phone */}
                  {(enableEmail || enablePhone) && (
                    <div className="grid grid-cols-2 gap-8">
                      {enableEmail && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            {emailLabel} {emailRequired && '*'}
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required={emailRequired}
                            placeholder={emailPlaceholder}
                            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                          />
                        </div>
                      )}
                      {enablePhone && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            {phoneLabel} {phoneRequired && '*'}
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required={phoneRequired}
                            placeholder={phonePlaceholder}
                            className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subject */}
                  {enableSubject && subjects.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">{subjectLabel}</label>
                      <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
                        {subjects.map((subj, idx) => (
                          <label key={idx} className="flex items-center">
                            <input 
                              type="radio" 
                              name="subject" 
                              value={subj.value || subj.label} 
                              checked={formData.subject === (subj.value || subj.label)}
                              onChange={handleRadioChange}
                              className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" 
                            />
                            <span className="ml-2 text-gray-700">{subj.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {enableMessage && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        {messageLabel} {messageRequired && '*'}
                      </label>
                      <textarea 
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required={messageRequired}
                        placeholder={messagePlaceholder}
                        className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                      ></textarea>
                    </div>
                  )}

                  {/* Custom Fields */}
                  {customFields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field.id}>
                        {field.type !== 'checkbox' && (
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            {field.label} {field.required && '*'}
                          </label>
                        )}
                        {renderCustomField(field)}
                      </div>
                    ))}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-800 text-white py-2 px-6 rounded-md font-semibold hover:bg-emerald-900 hover:scale-105 transition-all duration-300 text-sm flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : buttonLabel}
                    {!isSubmitting && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    )}
                  </button>
                </form>

                {/* Letter Send Image */}
                <div className="mt-8 flex justify-center">
                  <Image
                    src="/images/letter_send 1.png"
                    alt="Send Message"
                    width={200}
                    height={100}
                    className="opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-0">
        <div>
          <div className="relative h-[364px] w-full overflow-hidden shadow-lg">
            {/* Google Map */}
            <iframe
              title="Eastland Location Map"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31514.882642624544!2d77.196!3d28.529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sIN!4v1697960000000"
            />

            {/* Floating Location Card */}
            <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl p-6 max-w-md border border-emerald-100">
              <h3 className="text-lg font-semibold text-slate-900">
                {bannerContent.title || "Eastland Distributors"}
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                {address ? (
                  address.split(',').map((part: string, index: number) => (
                    <span key={index}>
                      {part.trim()}
                      {index < address.split(',').length - 1 && <>,<br /></>}
                    </span>
                  ))
                ) : (
                  <>
                    742 Evergreen Plaza, Sector 9,
                    <br /> Northbridge City,
                    <br /> Avalon - 560123.
                  </>
                )}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-3 py-1 text-xs">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                <span>Get Directions</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
