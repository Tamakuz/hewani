import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/footer-pattern.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 to-emerald-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">
                PremiumFarm
              </h2>
              <p className="text-emerald-100 mt-2">
                Penyedia hewan ternak premium terpercaya.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                Newsletter
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email anda..."
                  className="bg-emerald-800 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow"
                />
                <button className="bg-yellow-400 text-emerald-900 px-4 py-2 rounded-r-full hover:bg-yellow-300 transition-colors duration-300">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Beranda", "Tentang Kami", "Produk", "Layanan", "Kontak"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-emerald-100 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">→</span> {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-6">
              Layanan Kami
            </h3>
            <ul className="space-y-4">
              {[
                "Penjualan Hewan Qurban",
                "Aqiqah",
                "Konsultasi Peternakan",
                "Pengiriman Nasional",
                "Perawatan Hewan",
              ].map((service) => (
                <li key={service} className="text-emerald-100">
                  <span className="mr-2">•</span> {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-6">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "kudusan gumpang, surakarta, Jawa tengah, Indonesia",
                },
                {
                  icon: Phone,
                  text: "+62 812-1557-8585",
                },
                {
                  icon: Mail,
                  text: "dodyptmaji@gmail.com",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <item.icon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span className="text-emerald-100">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-emerald-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-emerald-100 text-sm">
              © {new Date().getFullYear()} PremiumFarm. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-emerald-100 hover:text-yellow-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-emerald-100 hover:text-yellow-400 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
