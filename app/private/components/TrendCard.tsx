"use client";

import { Tendencia } from "@/lib/dashboard.service";

interface TrendCardProps {
  tendencias?: Tendencia;
  loading?: boolean;
}

interface BadgeProps {
  value: number;
  label: string;
}

const TrendBadge = ({ value, label }: BadgeProps) => (
  <div
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      value >= 0
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    }`}
  >
    {value >= 0 ? "+" : ""}
    {value.toFixed(1)}% {label}
  </div>
);

export default function TrendCard({
  tendencias,
  loading = false,
}: TrendCardProps) {
  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 animate-pulse">
        <div className="h-5 w-32 bg-[#2A2F4A] rounded mb-4"></div>
        <div className="h-4 bg-[#2A2F4A] rounded mb-2"></div>
        <div className="h-3 bg-[#2A2F4A] rounded w-2/3"></div>
      </div>
    );
  }

  if (!tendencias) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-dashed border-[#2A2F4A] rounded-xl p-6">
        <p className="text-white font-semibold mb-2">Tendencias</p>
        <p className="text-gray-400 text-sm">
          No se encontraron tendencias para este usuario.
        </p>
      </div>
    );
  }

  const variacionIngresos = tendencias.variacionIngresos ?? 0;
  const variacionGastos = tendencias.variacionGastos ?? 0;

  return (
    <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 flex flex-col space-y-4">
      <div>
        <p className="text-sm text-gray-400">Tendencias</p>
        <h3 className="text-xl font-semibold text-white">
          {tendencias.mensaje || "Sin datos suficientes para tendencias."}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <TrendBadge value={variacionIngresos} label="ingresos" />
        <TrendBadge value={variacionGastos} label="gastos" />
      </div>
      {tendencias.tipo && (
        <span className="text-xs px-2 py-1 rounded bg-[#2A2F4A] text-gray-300 self-start">
          {tendencias.tipo}
        </span>
      )}
    </div>
  );
}
