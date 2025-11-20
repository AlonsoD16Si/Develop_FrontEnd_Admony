"use client";

import { ResumenFinanciero, Tendencia } from "@/lib/dashboard.service";

interface SummaryCardsProps {
  resumen: ResumenFinanciero;
  tendencias?: Tendencia;
  loading?: boolean;
}

export default function SummaryCards({
  resumen,
  tendencias,
  loading = false,
}: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
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

  const variacionBalance =
    tendencias &&
    tendencias.ingresosAnterior !== undefined &&
    tendencias.gastosAnterior !== undefined
      ? ((resumen.balanceNeto -
          (tendencias.ingresosAnterior - tendencias.gastosAnterior)) /
          (tendencias.ingresosAnterior - tendencias.gastosAnterior)) *
        100
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance Total */}
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Balance Total</h3>
          <div className="w-10 h-10 bg-[#F0B90B]/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#F0B90B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {formatCurrency(resumen.saldoActual)}
        </p>
        <p
          className={`text-xs ${
            variacionBalance >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {formatPercentage(variacionBalance)} este mes
        </p>
      </div>

      {/* Ingresos */}
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Ingresos</h3>
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {formatCurrency(resumen.totalIngresos + resumen.totalExtras)}
        </p>
        <p
          className={`text-xs ${
            tendencias &&
            tendencias.variacionIngresos !== undefined &&
            tendencias.variacionIngresos >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {tendencias && tendencias.variacionIngresos !== undefined
            ? `${formatPercentage(tendencias.variacionIngresos)} vs mes anterior`
            : "Este mes"}
        </p>
      </div>

      {/* Gastos */}
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Gastos</h3>
          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {formatCurrency(resumen.totalGastos)}
        </p>
        <p
          className={`text-xs ${
            tendencias &&
            tendencias.variacionGastos !== undefined &&
            tendencias.variacionGastos <= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {tendencias && tendencias.variacionGastos !== undefined
            ? `${formatPercentage(tendencias.variacionGastos)} vs mes anterior`
            : "Este mes"}
        </p>
      </div>

      {/* Ahorros - Tarjeta adicional */}
      <div className="md:col-span-3 bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Ahorro Total</h3>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(resumen.ahorroTotal)}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Porcentaje de Ahorro
            </h3>
            <p className="text-2xl font-bold text-[#F0B90B]">
              {resumen.porcentajeAhorro.toFixed(1)}%
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Balance Neto</h3>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(resumen.balanceNeto)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

