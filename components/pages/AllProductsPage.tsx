"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { fetchPageBySlug } from '@/lib/api'
import Banner from '@/components/sections/Banner'
import { Skeleton } from '@/components/ui/Skeleton'
import LazyImage from "@/components/ui/LazyImage"

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
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // Page data and banner
  const [pageData, setPageData] = useState<any>(null)
  const [bannerContent, setBannerContent] = useState<any>(null)
  
  // Filter and search states - initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
  const [selectedTag, setSelectedTag] = useState<string>(searchParams.get('tag') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '')
    
  // Product detail modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productDetails, setProductDetails] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  // Fetch page data for banner
  useEffect(() => {
    async function fetchPageData() {
      try {
        // Try slugs based on admin panel: products/all, products, all-products
        const slugs = ['products/all', 'products', 'all-products']
        let page = null
        
        for (const slug of slugs) {
          try {
            page = await fetchPageBySlug(slug)
            if (page) {
              console.log(`Found page with slug: ${slug}`)
              break
            }
          } catch (err) {
            // Continue to next slug if this one fails
            console.log(`Slug ${slug} not found, trying next...`)
            continue
          }
        }
        
        if (page) {
          setPageData(page)
          // Find banner section - check for banner in section name or type
          // Also check for see_more sections that have banner-like content (title, subTitle, image)
          const bannerSection = page.sections?.find((s: any) => {
            const type = (s.type || s.name || '').toLowerCase()
            const hasBannerName = type.includes('banner') || type === 'products_banner' || type === 'product_banner'
            
            // Check if it's a see_more section with banner content
            const isSeeMore = type.includes('see_more') || type.includes('see more')
            const content = s.content || {}
            const hasBannerContent = content.title || content.subTitle || content.image
            
            return hasBannerName || (isSeeMore && hasBannerContent)
          })
          if (bannerSection) {
            console.log('Found banner section:', bannerSection)
            setBannerContent(bannerSection.content)
          } else {
            console.log('No banner section found. Available sections:', page.sections?.map((s: any) => s.type || s.name))
          }
        } else {
          console.log('No page found for products. Will use default banner.')
        }
      } catch (err) {
        console.error('Error fetching page data:', err)
        // Silently fail - will use default banner
      }
    }
    
    fetchPageData()
  }, [])

  useEffect(() => {
    // Debounce filter changes to reduce API calls
    const timeoutId = setTimeout(() => {
      async function fetchAllProducts() {
        try {
          setLoading(true)
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
          
          // Build query parameters
          const params = new URLSearchParams()
          if (searchQuery) params.append('search', searchQuery)
          if (selectedCategory) params.append('category', selectedCategory)
          if (selectedTag) params.append('tag', selectedTag)
          if (selectedBrand) params.append('brand', selectedBrand)
          
          const queryString = params.toString()
          const url = `${API_BASE_URL}products${queryString ? `?${queryString}` : ''}`
          
          const response = await fetch(url, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          
          // Handle different response structures
          let allProducts: Product[] = []
          if (Array.isArray(data)) {
            allProducts = data
          } else if (data.data && Array.isArray(data.data)) {
            allProducts = data.data
          } else if (data.items && Array.isArray(data.items)) {
            allProducts = data.items
          } else if (Array.isArray(data.products)) {
            allProducts = data.products
          }
          
          setProducts(allProducts)
          setInitialLoading(false)
        } catch (err) {
          console.error('Error fetching products:', err)
          setError(err instanceof Error ? err.message : 'Failed to load products')
          setInitialLoading(false)
        } finally {
          setLoading(false)
        }
      }

      fetchAllProducts()
    }, searchQuery ? 500 : 300) // Longer debounce for search, shorter for filters

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory, selectedTag, selectedBrand])

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

  // Fetch filter options from backend (categories, tags, brands) - only once
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[]
    tags: string[]
    brands: string[]
  }>({ categories: [], tags: [], brands: [] })
  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false)

  useEffect(() => {
    // Only fetch filter options once
    if (filterOptionsLoaded) return

    async function fetchFilterOptions() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        
        // Fetch all products without filters to get unique filter options
        const response = await fetch(`${API_BASE_URL}products`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) return

        const data = await response.json()
        const allProducts: Product[] = Array.isArray(data) 
          ? data 
          : data.data && Array.isArray(data.data) 
            ? data.data 
            : []

        // Extract unique filter options
        const categories = new Set<string>()
        const tags = new Set<string>()
        const brands = new Set<string>()

        allProducts.forEach(product => {
          product.categories?.forEach(cat => {
            if (cat.name) categories.add(cat.name)
          })
          product.tags?.forEach(tag => {
            if (tag.name) tags.add(tag.name)
          })
          if (product.brand?.name) brands.add(product.brand.name)
        })

        setFilterOptions({
          categories: Array.from(categories).sort(),
          tags: Array.from(tags).sort(),
          brands: Array.from(brands).sort(),
        })
        setFilterOptionsLoaded(true)
      } catch (err) {
        console.error('Error fetching filter options:', err)
      }
    }

    fetchFilterOptions()
  }, [filterOptionsLoaded])

  // Products are already filtered by backend
  const filteredProducts = products

  // Update URL when filters change (without page reload)
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)
    if (selectedBrand) params.set('brand', selectedBrand)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
    
    // Use window.history.replaceState to update URL without page reload
    window.history.replaceState({}, '', newUrl)
  }, [searchQuery, selectedCategory, selectedTag, selectedBrand])

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

  // Skeleton UI for initial load
  if (initialLoading) {
    return (
      <main className="flex min-h-dvh flex-col">
        {/* Skeleton Banner */}
        <section className="relative h-[50vh] min-h-[320px] bg-slate-200 animate-pulse">
          <div className="absolute inset-0 bg-slate-300/40" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full">
              <Skeleton className="h-10 w-2/3 max-w-xl mb-4" />
              <Skeleton className="h-4 w-1/2 max-w-md" />
            </div>
          </div>
        </section>

        {/* Skeleton Grid Section */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
            {/* Skeleton filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-10 w-40 rounded-lg" />
                <Skeleton className="h-10 w-40 rounded-lg" />
                <Skeleton className="h-10 w-40 rounded-lg" />
              </div>
            </div>

            {/* Skeleton cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
      {/* Dynamic Banner Section */}
      <Banner 
        content={bannerContent}
        defaultTitle="All Products"
        defaultSubTitle="Explore our complete range of products"
        defaultImage="/images/default-banner.jpg"
      />

      {/* Products Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          {/* Search and Filters Section - Always show filters */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-end">
                  {/* Category Filter */}
                  <div className="flex-1 min-w-full sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Categories</option>
                      {filterOptions.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div className="flex-1 min-w-full sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Tag
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Tags</option>
                      {filterOptions.tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div className="flex-1 min-w-full sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Brands</option>
                      {filterOptions.brands.map((brand) => (
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
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

            {/* Content Area with Loading Overlay */}
            <div className="relative">
              {/* Loading Indicator for Filter Changes */}
              {loading && !initialLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading products...</p>
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-slate-600">
                  {hasActiveFilters ? (
                    <>
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                      {filterOptionsLoaded && filterOptions.categories.length > 0 && (
                        <> (filtered from available products)</>
                      )}
                    </>
                  ) : (
                    <>
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </>
                  )}
                </p>
              </div>

              {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 md:py-20">
                {hasActiveFilters ? (
                  <>
                    <p className="text-slate-600 text-base sm:text-lg">No products match your filters.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-block text-emerald-700 hover:underline text-sm sm:text-base"
                    >
                      Clear all filters
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-slate-600 text-base sm:text-lg">No products available at the moment.</p>
                    <Link href="/products" className="mt-4 inline-block text-emerald-700 hover:underline text-sm sm:text-base">
                      Back to Products
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div ref={gridRef} className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, index) => {
                  const productName = getProductName(product)
                  const productDescription = getProductDescription(product)
                  const productImage = getProductImage(product)

                  return (
                    <div
                      key={product.id}
                      className="product-card relative opacity-0"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">{productName}</h3>
                      <div className="mt-3 sm:mt-4 overflow-hidden rounded-lg sm:rounded-xl ring-1 ring-slate-200">
                        <div
                          className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                          style={{ backgroundImage: `url("${encodeURI(productImage)}")` }}
                        />
                      </div>
                      <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {productDescription}
                      </p>
                      {product.brand && (
                        <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-slate-500">
                          Brand: {product.brand.name}
                        </p>
                      )}
                      {product.categories && product.categories.length > 0 && (
                        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                          {product.categories.slice(0, 2).map((category, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-slate-100 text-slate-700 rounded"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 sm:mt-6">
                        <button
                          onClick={() => handleProductClick(product)}
                          className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer"
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
            </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
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
              <div className="flex items-center justify-center py-16 sm:py-24 md:py-32">
                <div className="text-center">
                  <div className="inline-block h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent mb-4"></div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">Loading product details...</p>
                </div>
              </div>
            ) : productDetails ? (
              <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
                {/* Left Side - Images */}
                <div className="lg:w-1/2 bg-slate-50 p-4 sm:p-6 lg:p-8">
                  {productDetails.images && productDetails.images.length > 0 ? (
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg bg-white">
                        <LazyImage
                          src={productDetails.images[0].url}
                          alt={getProductName(productDetails)}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          imageType="product"
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
                              <LazyImage
                                src={image.url}
                                alt={`${getProductName(productDetails)} - Image ${index + 2}`}
                                fill
                                className="object-cover"
                                imageType="product"
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
                <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  {/* Product Name */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
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

