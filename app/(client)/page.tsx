import { Metadata } from "next";

import ProductSection from "./components/Products";
import AboutSection from "./components/About";
import Navbar from "./components/Navbar";

import WhyChooseUsSection from "./components/wychoose";
import HeroSection from "./components/Hero";
import VideoSection from "./components/video";
import ContactSection from "./components/Contact";

export const metadata: Metadata = {
  title: "Peternakan Premium | Kambing Berkualitas",
  description: "Temukan kambing berkualitas premium untuk kebutuhan Anda",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhyChooseUsSection />
      <ProductSection />
      <VideoSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
