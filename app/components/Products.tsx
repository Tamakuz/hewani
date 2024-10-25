import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import products from '../data'

const ProductsSection = () => {
  return (
    <section id='products' className="bg-gradient-to-b from-emerald-50 to-emerald-100 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-900 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight">
          Koleksi Hewan Ternak Premium
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-emerald-700 text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20 leading-relaxed">
          Temukan pilihan hewan ternak terbaik untuk kebutuhan Anda. Dari kambing etawa hingga sapi limosin, kami menyediakan hewan berkualitas tinggi untuk qurban, aqiqah, atau peternakan Anda.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full">
                  {product.type}
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-2">{product.name}</h3>
                <p className="text-sm sm:text-base text-emerald-600 mb-3 sm:mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <span className="text-lg sm:text-xl font-bold text-emerald-700">{product.price}</span>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base rounded-full px-4 sm:px-6 py-2 transition-all duration-300 hover:shadow-lg w-full">
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection