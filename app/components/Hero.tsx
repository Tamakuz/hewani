import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    <div id='hero' className="relative h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] mt-16 sm:mt-20 flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1619421568694-5f4f0bf24903?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Kambing berkualitas"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-80" />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
          Kambing Berkualitas untuk Kebutuhan Anda
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 sm:mb-8">
          Pilihan terbaik untuk qurban, aqiqah, atau bisnis peternakan Anda
        </p>
        <Button
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-emerald-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Jelajahi Koleksi Kami
        </Button>
      </div>
    </div>
  );
}

export default HeroSection