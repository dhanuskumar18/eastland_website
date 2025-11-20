"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface Product {
  id: number
  sku: string
  brand?: {
    name: string
  }
  images?: Array<{
    url: string
    position: number
  }>
  translations?: Array<{
    locale: string
    name: string
    description?: string
  }>
  categories?: Array<{
    name: string
  }>
  tags?: Array<{
    name: string
  }>
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        let allProducts: Product[] = []
        
        // First, try to fetch without pagination (should return all products)
        let response = await fetch(`${API_BASE_URL}products`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
        }

        let data = await response.json()
        
        // Debug logging
        console.log('API Response:', data)
        console.log('Response type:', Array.isArray(data) ? 'Array' : typeof data)
        
        // Handle different response structures
        if (Array.isArray(data)) {
          // Direct array response (all products when no pagination)
          allProducts = data
          console.log('Fetched all products directly, count:', allProducts.length)
        } else if (data.data && Array.isArray(data.data)) {
          // Check if this is a paginated response
          if (data.meta && data.meta.total) {
            const total = data.meta.total
            const currentCount = data.data.length
            
            console.log(`Paginated response: ${currentCount} of ${total} products`)
            
            // If we got fewer products than total, fetch all pages
            if (currentCount < total) {
              console.log('Fetching all pages to get complete product list...')
              const limit = data.meta.limit || 100 // Use a high limit
              const totalPages = Math.ceil(total / limit)
              
              // Fetch all pages
              const pagePromises = []
              for (let page = 1; page <= totalPages; page++) {
                pagePromises.push(
                  fetch(`${API_BASE_URL}products?page=${page}&limit=${limit}`, {
                    cache: 'no-store',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(res => res.json())
                )
              }
              
              const pageResults = await Promise.all(pagePromises)
              allProducts = []
              
              pageResults.forEach((pageData: any) => {
                if (pageData.data && Array.isArray(pageData.data)) {
                  allProducts.push(...pageData.data)
                } else if (Array.isArray(pageData)) {
                  allProducts.push(...pageData)
                }
              })
              
              console.log('Fetched all pages, total products:', allProducts.length)
            } else {
              allProducts = data.data
            }
          } else {
            // Not paginated, just use the data array
            allProducts = data.data
          }
        } else if (data.items && Array.isArray(data.items)) {
          allProducts = data.items
        } else if (Array.isArray(data.products)) {
          allProducts = data.products
        } else {
          console.warn('Unexpected response structure:', data)
          // Try fetching with a very high limit as fallback
          console.log('Attempting to fetch with high limit...')
          response = await fetch(`${API_BASE_URL}products?limit=1000`, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const fallbackData = await response.json()
            if (Array.isArray(fallbackData)) {
              allProducts = fallbackData
            } else if (fallbackData.data && Array.isArray(fallbackData.data)) {
              allProducts = fallbackData.data
            }
          }
        }
        
        console.log('Final products list length:', allProducts.length)
        setProducts(allProducts)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (!gridRef.current || products.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true')
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-up-bounce')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const cards = gridRef.current.querySelectorAll('.product-card')
    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [products])

  const getProductName = (product: Product) => {
    const translation = product.translations?.find(t => t.locale === 'en') || product.translations?.[0]
    return translation?.name || `Product ${product.sku}`
  }

  const getProductDescription = (product: Product) => {
    const translation = product.translations?.find(t => t.locale === 'en') || product.translations?.[0]
    return translation?.description || "No description available"
  }

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url
    }
    return "/images/Products/2 (7).png" // Fallback image
  }

  if (loading) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading products...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link href="/products" className="mt-4 inline-block text-emerald-700 hover:underline">
            Back to Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              All Products
            </h1>
            <p className="mt-4 text-xl text-slate-300">
              Explore our complete range of products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No products available at the moment.</p>
              <Link href="/products" className="mt-4 inline-block text-emerald-700 hover:underline">
                Back to Products
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-slate-600">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => {
                  const productName = getProductName(product)
                  const productDescription = getProductDescription(product)
                  const productImage = getProductImage(product)

                  return (
                    <div
                      key={product.id}
                      className="product-card relative opacity-0"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">{productName}</h3>
                      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                        <div
                          className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                          style={{ backgroundImage: `url("${encodeURI(productImage)}")` }}
                        />
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {productDescription}
                      </p>
                      {product.brand && (
                        <p className="mt-3 text-xs text-slate-500">
                          Brand: {product.brand.name}
                        </p>
                      )}
                      {product.categories && product.categories.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.categories.slice(0, 2).map((category, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-6">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

