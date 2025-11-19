'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#8BB4D9] to-[#B6E6C7]
 opacity-0"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para tomar control de tus finanzas?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Únete a AdmonY y comienza a gestionar tus finanzas de manera
          inteligente hoy mismo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
          onClick={() => router.push("/register")}
          className="px-8 py-4 bg-[#00BFA6] text-white rounded-lg hover:bg-[#009f8e] transition-all transform hover:scale-105 font-semibold text-lg shadow-lg">
            Crear Cuenta Gratis
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold text-lg">
            Ver Demo
          </button>
        </div>
      </div>
    </section>
  );
}

