import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-100">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-2 sm:mb-3 md:mb-4">Penjualan Kambing</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">Menyediakan hewan ternak berkualitas tinggi</p>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-yellow-300 mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-xs sm:text-sm md:text-base">&copy; {new Date().getFullYear()} Penjualan Kambing. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer