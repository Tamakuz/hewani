"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-emerald-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 tracking-tight">
              Penjualan Kambing
            </span>
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2 lg:space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-emerald-100 hover:text-white transition duration-300 font-medium text-sm lg:text-base cursor-pointer"
                    onClick={() => scrollToSection("hero")}
                  >
                    Beranda
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-emerald-100 hover:text-white transition duration-300 font-medium text-sm lg:text-base cursor-pointer"
                    onClick={() => scrollToSection("products")}
                  >
                    Produk
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-emerald-100 hover:text-white transition duration-300 font-medium text-sm lg:text-base cursor-pointer"
                    onClick={() => scrollToSection("about")}
                  >
                    Tentang Kami
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-emerald-100 hover:text-white transition duration-300 font-medium text-sm lg:text-base cursor-pointer"
                    onClick={() => scrollToSection("contact")}
                  >
                    Kontak
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="bg-yellow-500 text-emerald-900 hover:bg-yellow-600 hover:text-white transition duration-300 shadow-md px-4 py-2 lg:px-6 lg:py-2 rounded-full font-bold text-sm lg:text-base border-2 border-yellow-400"
              onClick={() => scrollToSection("contact")}
            >
              Hubungi Kami
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMobile && isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-emerald-100 hover:text-white transition duration-300 font-medium text-base text-left"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-emerald-100 hover:text-white transition duration-300 font-medium text-base text-left"
              >
                Produk
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-emerald-100 hover:text-white transition duration-300 font-medium text-base text-left"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-emerald-100 hover:text-white transition duration-300 font-medium text-base text-left"
              >
                Kontak
              </button>
              <Button
                variant="outline"
                className="bg-yellow-500 text-emerald-900 hover:bg-yellow-600 hover:text-white transition duration-300 shadow-md px-4 py-2 rounded-full font-bold text-sm border-2 border-yellow-400 w-full"
                onClick={() => scrollToSection("contact")}
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
