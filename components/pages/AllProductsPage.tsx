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
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
    
  // Product detail modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productDetails, setProductDetails] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

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

  // Helper functions
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

  // Extract unique filter options from products
  const getUniqueCategories = () => {
    const categories = new Set<string>()
    products.forEach(product => {
      product.categories?.forEach(cat => {
        if (cat.name) categories.add(cat.name)
      })
    })
    return Array.from(categories).sort()
  }

  const getUniqueTags = () => {
    const tags = new Set<string>()
    products.forEach(product => {
      product.tags?.forEach(tag => {
        if (tag.name) tags.add(tag.name)
      })
    })
    return Array.from(tags).sort()
  }

  const getUniqueBrands = () => {
    const brands = new Set<string>()
    products.forEach(product => {
      if (product.brand?.name) brands.add(product.brand.name)
    })
    return Array.from(brands).sort()
  }

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const productName = getProductName(product).toLowerCase()
    const productDescription = getProductDescription(product).toLowerCase()
    const searchLower = searchQuery.toLowerCase()

    // Search filter
    const matchesSearch = !searchQuery || 
      productName.includes(searchLower) || 
      productDescription.includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower)

    // Category filter
    const matchesCategory = !selectedCategory || 
      product.categories?.some(cat => cat.name === selectedCategory)

    // Tag filter
    const matchesTag = !selectedTag || 
      product.tags?.some(tag => tag.name === selectedTag)

    // Brand filter
    const matchesBrand = !selectedBrand || 
      product.brand?.name === selectedBrand

    return matchesSearch && matchesCategory && matchesTag && matchesBrand
  })

  const categories = getUniqueCategories()
  const tags = getUniqueTags()
  const brands = getUniqueBrands()

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setSelectedBrand('')
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag || selectedBrand

  // Fetch product details when a product is selected
  useEffect(() => {
    async function fetchProductDetails() {
      if (!selectedProduct) return

      setLoadingDetails(true)
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        const response = await fetch(`${API_BASE_URL}products/${selectedProduct.id}`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch product details')
        }

        const data = await response.json()
        // Handle different response structures
        const details = data.data || data
        setProductDetails(details)
      } catch (err) {
        console.error('Error fetching product details:', err)
        // Use the product data we already have if API fails
        setProductDetails(selectedProduct)
      } finally {
        setLoadingDetails(false)
      }
    }

    if (selectedProduct && isModalOpen) {
      fetchProductDetails()
    }
  }, [selectedProduct, isModalOpen])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setProductDetails(null)
  }

  useEffect(() => {
    if (!gridRef.current || filteredProducts.length === 0) return

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

    // Reset all cards to be observed again when filters change
    const cards = gridRef.current.querySelectorAll('.product-card')
    cards.forEach((card) => {
      card.removeAttribute('data-animated')
      card.classList.add('opacity-0')
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredProducts])

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
              {/* Search and Filters Section */}
              <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 items-end">
                  {/* Category Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tag
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Tags</option>
                      {tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-slate-600">
                  {hasActiveFilters ? (
                    <>
                      Showing {filteredProducts.length} of {products.length} {products.length === 1 ? 'product' : 'products'}
                    </>
                  ) : (
                    <>
                      Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                    </>
                  )}
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-600 text-lg">No products match your filters.</p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-block text-emerald-700 hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product, index) => {
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
                        <button
                          onClick={() => handleProductClick(product)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer"
                          aria-label="View product details"
                        >
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
                        </button>
                      </div>
                    </div>
                  )
                })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 hover:scale-110 border border-slate-200"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {loadingDetails ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent mb-4"></div>
                  <p className="text-slate-600 font-medium">Loading product details...</p>
                </div>
              </div>
            ) : productDetails ? (
              <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
                {/* Left Side - Images */}
                <div className="lg:w-1/2 bg-slate-50 p-6 lg:p-8">
                  {productDetails.images && productDetails.images.length > 0 ? (
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg bg-white">
                        <img
                          src={productDetails.images[0].url}
                          alt={getProductName(productDetails)}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      {/* Thumbnail Grid */}
                      {productDetails.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                          {productDetails.images.slice(1, 5).map((image: any, index: number) => (
                            <div 
                              key={index + 1} 
                              className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-emerald-500 transition-all duration-200 hover:shadow-md"
                            >
                              <img
                                src={image.url}
                                alt={`${getProductName(productDetails)} - Image ${index + 2}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right Side - Details */}
                <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                  {/* Product Name */}
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                    {getProductName(productDetails)}
                  </h2>

                  {/* Brand */}
                  {productDetails.brand && (
                    <div className="mb-6 pb-6 border-b border-slate-200">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                        <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm font-semibold text-emerald-700">{productDetails.brand.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {getProductDescription(productDetails) && getProductDescription(productDetails) !== "No description available" && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Description
                      </h3>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                        {getProductDescription(productDetails)}
                      </p>
                    </div>
                  )}

                  {/* Categories */}
                  {productDetails.categories && productDetails.categories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {productDetails.categories.map((category: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {productDetails.tags && productDetails.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {productDetails.tags.map((tag: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-colors duration-200"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-lg mb-6">Failed to load product details.</p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

