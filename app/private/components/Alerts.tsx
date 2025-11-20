"use client";

import { Alerta } from "@/lib/dashboard.service";

interface AlertsProps {
  alertas: Alerta[];
  loading?: boolean;
}

export default function Alerts({ alertas, loading = false }: AlertsProps) {
  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Alertas</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-16 bg-[#2A2F4A] rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (alertas.length === 0) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Alertas</h2>
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-600 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500">No hay alertas en este momento</p>
        </div>
      </div>
    );
  }

  const getAlertStyles = (tipo: Alerta["tipo"], severidad: Alerta["severidad"]) => {
    const baseStyles = "border-l-4 p-4 rounded-lg";
    
    if (tipo === "exito") {
      return `${baseStyles} bg-green-500/10 border-green-500 text-green-400`;
    }
    if (tipo === "advertencia") {
      const severityStyles =
        severidad === "alta"
          ? "bg-red-500/10 border-red-500 text-red-400"
          : severidad === "media"
          ? "bg-yellow-500/10 border-yellow-500 text-yellow-400"
          : "bg-orange-500/10 border-orange-500 text-orange-400";
      return `${baseStyles} ${severityStyles}`;
    }
    return `${baseStyles} bg-blue-500/10 border-blue-500 text-blue-400`;
  };

  const getIcon = (tipo: Alerta["tipo"]) => {
    if (tipo === "exito") {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }
    if (tipo === "advertencia") {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  return (
    <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Alertas</h2>
      <div className="space-y-3">
        {alertas.map((alerta, index) => (
          <div
            key={index}
            className={getAlertStyles(alerta.tipo, alerta.severidad)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon(alerta.tipo)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alerta.mensaje}</p>
                <p className="text-xs mt-1 opacity-75">
                  Severidad: {alerta.severidad}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

