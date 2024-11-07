"use client";

import { useState, useRef } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lihat Keunggulan Peternakan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jelajahi fasilitas modern dan proses perawatan ternak berkualitas
            premium kami melalui video berikut.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black">
          {/* Main Video */}
          <video
            ref={videoRef}
            className="w-full aspect-video"
            poster="/tumnil.avif" // Add your thumbnail image
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/video.mp4" type="video/mp4" />{" "}
            {/* Add your video source */}
            Your browser does not support the video tag.
          </video>

          {/* Custom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              {/* Left Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={handleMute}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Right Controls */}
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Proses Pemeliharaan Ternak Premium
          </h3>
          <p className="text-gray-600">
            Video ini menampilkan bagaimana kami merawat dan memelihara ternak
            dengan standar kualitas tertinggi untuk memastikan kepuasan
            pelanggan kami.
          </p>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Kandang Modern
            </h4>
            <p className="text-gray-600">
              Fasilitas kandang yang bersih dan modern untuk kesehatan optimal
              ternak.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Pakan Berkualitas
            </h4>
            <p className="text-gray-600">
              Pemberian pakan premium untuk pertumbuhan dan kesehatan ternak
              yang optimal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Pemeriksaan Rutin
            </h4>
            <p className="text-gray-600">
              Pemeriksaan kesehatan rutin oleh tim dokter hewan berpengalaman.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
