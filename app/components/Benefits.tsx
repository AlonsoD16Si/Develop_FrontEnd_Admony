'use client';

import { useEffect, useRef } from 'react';

export default function Benefits() {
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

  const benefits = [
    {
      title: 'Control Total',
      description:
        'Ten visibilidad completa de tus finanzas en tiempo real y toma decisiones informadas.',
    },
    {
      title: 'Ahorro Inteligente',
      description:
        'Cumple tus metas de ahorro con herramientas que te ayudan a planificar y alcanzar objetivos.',
    },
    {
      title: 'Educación Financiera',
      description:
        'Mejora tu salud financiera con recomendaciones personalizadas y análisis de tendencias.',
    },
    {
      title: 'Accesibilidad',
      description:
        'Accede desde cualquier dispositivo, en cualquier momento, con sincronización automática.',
    },
  ];

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F8F8F8] to-white opacity-0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Beneficios para Ti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AdmonY no solo soluciona un problema práctico, sino que también
            contribuye a mejorar tu educación y salud financiera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl border-2 border-[#007A60]/20 hover:border-[#007A60] transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#007A60] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#000000] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

