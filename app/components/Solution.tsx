'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="solucion"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2B40B5]/5 to-[#007A60]/5 opacity-0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
              La Solución: AdmonY
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              AdmonY es una plataforma web progresiva (PWA) y móvil que permite
              a los usuarios gestionar de manera integral sus finanzas
              personales.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              La solución combina gestión de gastos, ahorros y presupuestos,
              control de pagos de servicios, chatbot inteligente para
              recomendaciones personalizadas, y escalabilidad futura para
              integrar bancos, inversiones y análisis avanzado.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007A60] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  Visualización clara y organizada de tus finanzas personales
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007A60] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  Decisiones informadas sobre gastos, ahorro y presupuesto
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007A60] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  Alertas y recomendaciones personalizadas que fomentan hábitos
                  financieros responsables
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
  <div className="relative w-full h-96 from-[#2B40B5]/20 to-[#007A60]/20 rounded-2xl overflow-hidden ">
    <Image
      src="/banner_landing_2.png"
      alt="AdmonY Banner"
      fill
      className="object-cover"
      priority
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

