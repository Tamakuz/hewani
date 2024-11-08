import { CheckCircle, Users, Award, Clock, Loader2 } from "lucide-react";

const stats = [
  {
    value: "1000+",
    label: "Pelanggan Puas",
    icon: Users,
  },
  {
    value: "10+",
    label: "Tahun Pengalaman",
    icon: Clock,
  },
  {
    value: "100%",
    label: "Jaminan Kualitas",
    icon: Award,
  },
];

const features = [
  {
    title: "Kualitas Premium",
    description:
      "Hewan ternak pilihan dengan kualitas terbaik dan kesehatan terjamin",
  },
  {
    title: "Perawatan Profesional",
    description: "Tim dokter hewan berpengalaman untuk perawatan optimal",
  },
  {
    title: "Pengiriman Aman",
    description: "Layanan pengiriman yang aman ke seluruh Indonesia",
  },
  {
    title: "Konsultasi Gratis",
    description: "Konsultasi gratis dengan tim ahli kami",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-emerald-50 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-emerald-100 to-emerald-200" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-emerald-200 to-emerald-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            TENTANG KAMI
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Penyedia Hewan Ternak Premium Terpercaya
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Dengan pengalaman lebih dari 5 tahun, kami berkomitmen menyediakan
            hewan ternak berkualitas tinggi dengan standar kesehatan terbaik.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-10 w-10 text-emerald-600" />
                <span className="text-3xl font-bold text-emerald-600">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative">
              <img
                src="/kami1.avif" // Add your farm image
                alt="Our Farm"
                className="rounded-2xl shadow-2xl object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Mengapa Memilih Kami?
            </h3>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-300">
              Hubungi Kami
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
