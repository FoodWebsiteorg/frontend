"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CarouselClient({
  slides,
  interval = 4000,
}: {
  slides: {
    image: string;
    alt: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    cta?: { href: string; label: string };
  }[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      nextSlide();
    }, interval);
  };

  const stopAuto = () => clearInterval(timerRef.current);

  const nextSlide = () => {
    setIndex((i) => (i + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            i === index
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-8 left-8 text-white max-w-xl">
            {s.badge && <Badge className="mb-2">{s.badge}</Badge>}
            <h2 className="text-3xl md:text-5xl font-bold">{s.title}</h2>
            <p className="mt-2 text-lg text-white/80">{s.subtitle}</p>

            {s.cta && (
              <Button asChild className="mt-4 bg-white text-black hover:bg-white/90">
                <Link href={s.cta.href}>{s.cta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white w-6" : "bg-white/50"
            } transition-all`}
          />
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow-md z-30"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow-md z-30"
      >
        ›
      </button>
    </div>
  );
}
