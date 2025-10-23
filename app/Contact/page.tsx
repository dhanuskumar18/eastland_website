import Image from "next/image"

export default function ContactUsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Services/Rectangle 52 (5).png"
            alt="Contact Us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Get in Touch with Our Team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="bg-transparent rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%]">
              {/* Left Side - Contact Information */}
              <div className="p-[10px] relative leading-7">
                <div className="relative z-10 rounded-xl border border-emerald-500/40 p-[35px] bg-emerald-700 text-white">
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                    <div className="w-full h-full rounded-full bg-emerald-300"></div>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-emerald-100 mb-8 leading-7">
                    Reach out to us for inquiries, support, or project consultations. Our team is available through phone or email to assist you promptly and provide reliable communication every step.
                  </p>
                  
                  {/* Phone Numbers */}
                  <div className="mb-7 flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="space-y-3">
                      <p>876.322-1010</p>
                      <p>876.886.3000</p>
                      <p>876.906-1111</p>
                    </div>
                  </div>

                  {/* Email Addresses */}
                  <div className="mb-7 flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="space-y-3">
                      <p>eastlanddbs@hotmail.com</p>
                      <p>eastlanddbs@hotmail.com</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-10 flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p>742 Evergreen Plaza, Sector 9, Northbridge City, Avalon - 560123.</p>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex space-x-4">
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
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-[40px] bg-transparent">
                <form className="space-y-6 text-sm">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="Jhon"
                        className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="Doe"
                        className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="jhondoe@gmail.com"
                        className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+1 012 3456 789"
                        className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Select Subject?</label>
                    <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="general" defaultChecked className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
                        <span className="ml-2 text-gray-700">General Inquiry</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="support" className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
                        <span className="ml-2 text-gray-700">General Inquiry</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="project" className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
                        <span className="ml-2 text-gray-700">General Inquiry</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="other" className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
                        <span className="ml-2 text-gray-700">General Inquiry</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={3}
                      placeholder="Write your message.."
                      className="w-full bg-transparent px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-emerald-600 text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-800 text-white py-2 px-6 rounded-md font-semibold hover:bg-emerald-900 hover:scale-105 transition-all duration-300 text-sm flex items-center gap-3 group"
                  >
                    Send Message
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 rotate-45 group-hover:rotate-0"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                  
                  {/* Letter Send Image */}
                  <div className="mt-4 flex justify-center">
                    <Image
                      src="/images/letter_send 1.png"
                      alt="Send Message"
                      width={32}
                      height={32}
                      className="opacity-60"
                    />
                  </div>
                </form>

                {/* Decorative Element */}
                <div className="mt-8 flex justify-center">
                  <div className="text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
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
              <h3 className="text-lg font-semibold text-slate-900">Eastland Distributors</h3>
              <p className="mt-2 text-sm text-slate-700">
                742 Evergreen Plaza, Sector 9,
                <br /> Northbridge City,
                <br /> Avalon - 560123.
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
