"use client";

import { DetalleFinanciero } from "@/lib/dashboard.service";

interface FinancialBreakdownProps {
  detalle?: DetalleFinanciero;
  loading?: boolean;
}

const CARD_STYLES = {
  ingresos: {
    title: "Ingresos",
    accent: "text-green-400",
    bg: "bg-green-500/20 text-green-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  gastos: {
    title: "Gastos",
    accent: "text-red-400",
    bg: "bg-red-500/20 text-red-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        />
      </svg>
    ),
  },
  extras: {
    title: "Extras",
    accent: "text-yellow-400",
    bg: "bg-yellow-500/20 text-yellow-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  ahorros: {
    title: "Ahorros",
    accent: "text-blue-400",
    bg: "bg-blue-500/20 text-blue-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
};

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function FinancialBreakdown({
  detalle,
  loading = false,
}: FinancialBreakdownProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-[#2A2F4A] rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-[#2A2F4A] rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-[#2A2F4A] rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!detalle) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 mb-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-white font-semibold">Sin detalle financiero</p>
            <p className="text-gray-400 text-sm">
              No se encontró información detallada para este usuario.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      key: "ingresos" as const,
      total: detalle.ingresos?.total ?? 0,
      count: detalle.ingresos?.transacciones?.length ?? 0,
    },
    {
      key: "gastos" as const,
      total: detalle.gastos?.total ?? 0,
      count: detalle.gastos?.transacciones?.length ?? 0,
    },
    {
      key: "extras" as const,
      total: detalle.extras?.total ?? 0,
      count: detalle.extras?.transacciones?.length ?? 0,
    },
    {
      key: "ahorros" as const,
      total: detalle.ahorros?.total ?? 0,
      count: detalle.ahorros?.objetivos?.length ?? 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map(({ key, total, count }) => {
        const style = CARD_STYLES[key];
        return (
          <div
            key={key}
            className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">{style.title}</p>
                <p className={`text-2xl font-semibold text-white ${style.accent}`}>
                  {formatter.format(total)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${style.bg}`}>
                {style.icon}
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {count > 0
                ? `${count} ${key === "ahorros" ? "objetivos" : "transacciones"} registradas`
                : "Sin registros disponibles"}
            </p>
          </div>
        );
      })}
    </div>
  );
}


