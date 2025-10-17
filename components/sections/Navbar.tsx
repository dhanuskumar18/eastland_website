"use client"

import Link from "next/link"
import { Button } from "../ui/Button"

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-6 flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/10">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <span className="h-6 w-6 rounded-full bg-emerald-600" />
            <span className="text-sm font-semibold text-slate-900">Eastland Distributors Ltd.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white drop-shadow-sm">
            <Link href="/" className="hover:text-emerald-200 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-emerald-200 transition-colors">About Us</Link>
            <Link href="/products" className="hover:text-emerald-200 transition-colors">Products</Link>
            <Link href="/services" className="hover:text-emerald-200 transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-emerald-200 transition-colors">Contact Us</Link>
          </div>

          <div className="ml-4">
            <Button href="/contact" variant="light" className="rounded-full">Enquire Now</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
