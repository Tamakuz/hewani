import AboutSection from "./components/About";
import ContactSection from "./components/Contact";
import HeroSection from "./components/Hero";
import ProductsSection from "./components/Products";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
