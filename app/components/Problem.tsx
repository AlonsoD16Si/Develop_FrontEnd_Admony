'use client';

import { useEffect, useRef } from 'react';

export default function Problem() {
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

  const problems = [
    {
      title: 'Descontrol de gastos',
      description:
        'Las personas pierden la visibilidad de a dónde se dirige su dinero, lo que puede llevar a sobreendeudamiento o a la imposibilidad de cumplir metas de ahorro.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Falta de organización',
      description:
        'No hay herramientas que integren gastos, ahorros y pagos de servicios en un solo lugar, ni que permitan analizar tendencias financieras a lo largo del tiempo.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Ausencia de recomendaciones',
      description:
        'Los usuarios no reciben sugerencias adaptadas a su comportamiento financiero, por lo que muchas veces repiten errores o desaprovechan oportunidades de ahorro.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Dificultad para planificar',
      description:
        'Ahorrar para metas específicas, gestionar presupuestos o cumplir con pagos recurrentes se vuelve complicado y requiere mucho esfuerzo manual.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Limitaciones de acceso',
      description:
        'Las soluciones actuales no siempre permiten el uso multiplataforma (web y móvil) ni la sincronización automática de información en la nube.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];
  return (
    <section
      id="problema"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FA] opacity-0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
            El Problema que Detectamos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En la actualidad, muchas personas enfrentan dificultades para
            administrar sus finanzas personales de manera efectiva, debido a la
            falta de herramientas integrales e información fragmentada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 bg-[#F7F9FA] rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4 text-[#000000]">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

