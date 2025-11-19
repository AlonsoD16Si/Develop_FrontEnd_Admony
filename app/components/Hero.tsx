"use client";
import Image from "next/image";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-[#F7F9FA] pt-16 px-4 sm:px-6 lg:px-8 opacity-0"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[#1E1E1E] leading-tight">
            Administración Inteligente de
            <span className="block text-[#0A3A63] mt-2">
              Finanzas Personales
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Toma el control de tus finanzas con una plataforma integral que te
            ayuda a gestionar gastos, ahorros, presupuestos y mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">

            <button 
                          onClick={() => router.push("/register")}

            className="px-8 py-4 bg-[#00BFA6] text-white rounded-lg hover:bg-[#009f8e] transition-all transform hover:scale-105 font-semibold text-lg shadow-lg
            
            ">
              Comenzar Ahora
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-[#2FBF71] text-[#2FBF71] rounded-lg hover:bg-[#2FBF71] hover:text-white transition-all font-semibold text-lg">
              Saber Más
            </button>
          </div>
        </div>
         <div className="relative">
  <div className="relative w-full h-96 from-[#0A3A63]/20 to-[#2FBF71]/20 rounded-2xl overflow-hidden border-2 border-[#D7DDE3]  mt-6">
            <Image
              src="/banner_landing.png"
              alt="AdmonY Banner"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
