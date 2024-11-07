import { Phone } from "lucide-react";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6281234567890"; // Replace with your actual WhatsApp number
    const message = encodeURIComponent(
      "Halo, saya ingin bertanya tentang produk kambing Anda."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
    >
      <Phone className="h-6 w-6" />
    </button>
  );
}
