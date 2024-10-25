import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-emerald-100 to-emerald-200 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] order-1 lg:order-none">
            <Image
              src="https://img.freepik.com/free-photo/beautiful-asian-woman-farmer-with-cows-cowshed-dairy-farm_1150-12771.jpg?t=st=1729870411~exp=1729874011~hmac=06c16cd5b62041a63f29253951d7e5c17927ba281822cf97eb1362ee09cc8a25&w=1060"
              alt="Peternakan kambing kami"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="order-2 lg:order-none">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4 sm:mb-6 tracking-tight">
              Tentang Kami
            </h2>
            <p className="text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
              Kami adalah peternakan kambing terkemuka yang berkomitmen untuk
              menyediakan hewan ternak berkualitas tinggi. Dengan pengalaman
              lebih dari 20 tahun, kami telah mengembangkan metode peternakan
              yang mengutamakan kesehatan dan kesejahteraan hewan.
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                "Kambing berkualitas premium",
                "Perawatan hewan terbaik",
                "Pengiriman ke seluruh Indonesia",
                "Layanan konsultasi gratis",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-emerald-700 text-sm sm:text-base"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-emerald-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 hover:shadow-lg text-sm sm:text-base">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection