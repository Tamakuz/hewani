// components/WhyChooseUs.tsx
import { Shield, Heart, Clock, Award } from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description:
        "Seluruh ternak kami melalui proses seleksi ketat dan pemeriksaan kesehatan rutin.",
    },
    {
      icon: Heart,
      title: "Perawatan Terbaik",
      description:
        "Ternak kami mendapatkan perawatan optimal dan pakan berkualitas tinggi.",
    },
    {
      icon: Clock,
      title: "Layanan 24/7",
      description:
        "Tim kami siap membantu Anda kapanpun Anda membutuhkan bantuan.",
    },
    {
      icon: Award,
      title: "Berpengalaman",
      description: "Lebih dari 10 tahun pengalaman dalam industri peternakan.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen untuk memberikan yang terbaik bagi pelanggan kami
            dengan standar kualitas tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-emerald-100 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
