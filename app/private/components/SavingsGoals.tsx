"use client";

import { ObjetivoAhorro } from "@/lib/dashboard.service";

interface SavingsGoalsProps {
  objetivos?: ObjetivoAhorro[];
  loading?: boolean;
}

export default function SavingsGoals({
  objetivos,
  loading = false,
}: SavingsGoalsProps) {
  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Objetivos de ahorro</h2>
          <div className="h-6 w-32 bg-[#2A2F4A] rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-[#2A2F4A] rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!objetivos || objetivos.length === 0) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-dashed border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Objetivos de ahorro</h2>
        <div className="text-center py-10">
          <svg className="w-14 h-14 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-sm">
            No se encontraron objetivos de ahorro para este usuario.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-white">Objetivos de ahorro</h2>
        <p className="text-sm text-gray-400">
          {objetivos.length} {objetivos.length === 1 ? "objetivo activo" : "objetivos activos"}
        </p>
      </div>
      <div className="space-y-4">
        {objetivos.map((objetivo, index) => {
          const progreso = Math.min(100, Math.max(0, objetivo.progreso ?? 0));
          return (
            <div
              key={`${objetivo.objetivo}-${index}`}
              className="p-4 bg-[#11142D] rounded-lg border border-[#2A2F4A]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-white font-semibold">{objetivo.objetivo}</p>
                  {objetivo.descripcion && (
                    <p className="text-sm text-gray-400">{objetivo.descripcion}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Meta</p>
                  <p className="text-white font-semibold">
                    {new Intl.NumberFormat("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }).format(objetivo.montoMeta ?? 0)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>
                  Acumulado:{" "}
                  <strong className="text-white">
                    {new Intl.NumberFormat("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }).format(objetivo.montoAhorrado ?? 0)}
                  </strong>
                </span>
                <span>Progreso: {progreso}%</span>
              </div>
              <div className="h-2 bg-[#2A2F4A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F0B90B] to-[#F4D03F]"
                  style={{ width: `${progreso}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


