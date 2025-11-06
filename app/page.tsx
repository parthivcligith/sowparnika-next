"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  image_url: string
}

export default function Home() {
  const [featuredProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Apartment in Muraito, Ticino, Switzerland",
      location: "Muraito, Ticino, Switzerland",
      price: 2131741930,
      bedrooms: 3,
      bathrooms: 2,
      image_url: "/modern-apartment-interior-with-dining-area.jpg",
    },
    {
      id: "2",
      title: "House in Mexico City, Mexico",
      location: "Mexico City, Mexico",
      price: 1666767370,
      bedrooms: 5,
      bathrooms: 4,
      image_url: "/colonial-villa-exterior-with-courtyard.jpg",
    },
    {
      id: "3",
      title: "Castle in Umbria, Italy",
      location: "Umbria, Italy",
      price: 12272165710,
      bedrooms: 12,
      bathrooms: 8,
      image_url: "/italian-castle-with-rolling-hills.jpg",
    },
    {
      id: "4",
      title: "Villa in Bora Bora, French Polynesia",
      location: "Bora Bora, French Polynesia",
      price: 34567346580,
      bedrooms: 6,
      bathrooms: 5,
      image_url: "/overwater-bungalow-tropical-resort.jpg",
    },
    {
      id: "5",
      title: "Castle in Etretat, Normandy, France",
      location: "Normandy, France",
      price: 1510969110,
      bedrooms: 10,
      bathrooms: 7,
      image_url: "/french-castle-cliffside-normandy.jpg",
    },
  ])

  const [trendingProperties] = useState<Property[]>([
    {
      id: "6",
      title: "Private Island in Raa Atoll, Maldives",
      location: "Raa Atoll, Maldives",
      price: 7090737760,
      bedrooms: 8,
      bathrooms: 6,
      image_url: "/private-island-aerial-maldives-turquoise.jpg",
    },
    {
      id: "7",
      title: "Villa in Maafushi, Kaafu Atoll",
      location: "Kaafu Atoll, Maldives",
      price: 4378530560,
      bedrooms: 7,
      bathrooms: 5,
      image_url: "/maldives-villa-beach-with-pool.jpg",
    },
    {
      id: "8",
      title: "House in Newport Beach, California",
      location: "Newport Beach, California, USA",
      price: 3363668720,
      bedrooms: 6,
      bathrooms: 5,
      image_url: "/modern-white-house-newport-beach-california.jpg",
    },
    {
      id: "9",
      title: "Villa in Benahavís, Andalusia",
      location: "Benahavís, Andalusia, Spain",
      price: 3716332380,
      bedrooms: 7,
      bathrooms: 6,
      image_url: "/spanish-villa-white-modern-architecture.jpg",
    },
    {
      id: "10",
      title: "Chalet in Gstaad, Switzerland",
      location: "Gstaad, Switzerland",
      price: 4166114770,
      bedrooms: 8,
      bathrooms: 6,
      image_url: "/swiss-alpine-chalet-mountain-views.jpg",
    },
  ])

  const [searches] = useState([
    { location: "Costa del Sol, Spain", listings: 23683 },
    { location: "French and Swiss Alps", listings: 7764 },
    { location: "Los Angeles, CA, USA", listings: 2555 },
    { location: "French Riviera, France", listings: 26482 },
    { location: "Paris, France", listings: 8472 },
    { location: "Costa Blanca, Spain", listings: 17999 },
  ])

  const scrollContainer = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 400
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-white">JAMES EDITION</h1>
          <nav className="flex gap-4 items-center">
            <Link href="/listings">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Browse
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Admin
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-white text-black hover:bg-gray-100">Log in</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=luxury modern estate with pool)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-6xl md:text-7xl font-serif font-bold text-white mb-8 text-balance">
            Explore the World's Finest Properties
          </h2>

          {/* Search Bar */}
          <div className="flex gap-3 bg-white rounded-lg p-2 mb-8 max-w-2xl w-full">
            <input
              type="text"
              placeholder="City, Region, Country"
              className="flex-1 px-4 py-2 outline-none text-gray-900"
            />
            <select className="px-4 py-2 outline-none text-gray-700">
              <option>Any price</option>
              <option>Under $1M</option>
              <option>$1M - $5M</option>
              <option>$5M+</option>
            </select>
            <select className="px-4 py-2 outline-none text-gray-700">
              <option>Any beds</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Search</Button>
          </div>

          <p className="text-white text-sm font-medium">
            EXPLORE 520,000+ HOMES, MANSIONS AND VILLAS FOR SALE WORLDWIDE IN ONE SIMPLE SEARCH
          </p>
        </div>

        {/* Property Info at Bottom */}
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-sm">Villa in Nueva Andalucia, Marbella, Spain</p>
        </div>
      </div>

      {/* Agency Logos Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-center text-sm font-medium mb-8">TRUSTED BY THE WORLD'S BEST AGENCIES</p>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-8 items-center justify-center">
            {[
              "Sotheby's",
              "Christie's",
              "Knight Frank",
              "Engel & Völkers",
              "Barnes",
              "Coldwell Banker",
              "Fine Country",
            ].map((agency) => (
              <div key={agency} className="text-white text-center text-xs font-semibold opacity-70">
                {agency}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homes You'll Love */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-serif font-bold">Homes You'll Love</h3>
            <Link href="/listings">
              <Button variant="ghost" className="text-blue-600">
                View all
              </Button>
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div ref={scrollContainer} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {featuredProperties.map((property) => (
                <div key={property.id} className="flex-shrink-0 w-72">
                  <div className="relative group">
                    <img
                      src={property.image_url || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-lg">{formatPrice(property.price)}</p>
                    <p className="text-gray-600 text-sm">{property.location}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {property.bedrooms} bed · {property.bathrooms} bath
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif font-bold mb-2">Weekly highlight</h3>
          <p className="text-gray-600 mb-8">Bocas del Toro, Bocas del Toro Province, Panama</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img
                src="/luxury-lodge-panama-with-pool.jpg"
                alt="Weekly highlight"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">FEATURED PROPERTY</p>
                <h4 className="text-2xl font-serif font-bold mb-4">Agua Lodge Marina & Spa</h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Luxury Eco Residences in Bocas del Toro, Panama. Exclusive waterfront properties offering premium
                  amenities and pristine natural surroundings.
                </p>
                <Link href="/listings">
                  <Button variant="outline">Read more</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-start gap-8 mb-8">
              <div>
                <h3 className="text-3xl font-serif font-bold mb-4">Trending</h3>
                <p className="text-gray-600 max-w-md">
                  Discover the homes that are capturing attention in the market. This curated selection showcases the
                  most sought-after properties available right now.
                </p>
                <Link href="/listings">
                  <Button className="mt-4 bg-black text-white hover:bg-gray-900">See all</Button>
                </Link>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <div ref={scrollContainer} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {trendingProperties.slice(0, 5).map((property) => (
                      <div key={property.id} className="flex-shrink-0 w-80">
                        <img
                          src={property.image_url || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <p className="mt-3 font-bold">{formatPrice(property.price)}</p>
                        <p className="text-gray-600 text-sm">{property.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif font-bold mb-12">Popular Searches</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {searches.map((search, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={`/.jpg?height=200&width=400&query=${search.location} luxury real estate`}
                  alt={search.location}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{search.location}</h4>
                  <p className="text-gray-600 text-sm">{search.listings.toLocaleString()} LISTINGS</p>
                  <p className="text-gray-400 text-sm mt-2">→</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/listings">
              <Button className="bg-black text-white hover:bg-gray-900">View all homes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm">© 2025 James Edition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
