"use client";
import { useState } from "react";
import { ArrowRight, ShoppingCart, Star, Eye, Phone } from "lucide-react";
import Link from "next/link";
import products from "../data";
export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  type: string;
  weight: string;
  age: string;
}
export default function ProductSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 6);

  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "6281234567890"; // Replace with your actual WhatsApp number
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan produk ${productName}. Boleh tahu informasi lengkapnya?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-white to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Koleksi Kambing Premium
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih dari berbagai jenis kambing berkualitas tinggi yang telah kami
            seleksi dengan ketat untuk memastikan kepuasan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleWhatsAppClick(product.name)}
                    className="bg-white text-emerald-600 p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-300"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="bg-white text-emerald-600 p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-300">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
                {/* Product Type Badge */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {product.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Product Details */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="font-medium">Berat:</span>
                    <span className="ml-1">{product.weight}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center">
                    <span className="font-medium">Usia:</span>
                    <span className="ml-1">{product.age}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-gray-500 text-sm">Harga</span>
                    <div className="text-xl font-bold text-emerald-600">
                      {product.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsAppClick(product.name)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors group"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && products.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors group"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
