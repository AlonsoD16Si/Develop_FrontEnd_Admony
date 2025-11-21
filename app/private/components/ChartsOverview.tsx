"use client";

import { GraficasDashboard } from "@/lib/dashboard.service";

interface ChartsOverviewProps {
  graficas?: GraficasDashboard;
  loading?: boolean;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function ChartsOverview({
  graficas,
  loading = false,
}: ChartsOverviewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 animate-pulse"
          >
            <div className="h-6 w-40 bg-[#2A2F4A] rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-[#2A2F4A] rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!graficas) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-dashed border-[#2A2F4A] rounded-xl p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 12h2m-1-1v2m9-1a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-white font-semibold">Sin datos de gráficas</p>
          <p className="text-gray-400 text-sm">
            No se recibió información visual para este usuario.
          </p>
        </div>
      </div>
    );
  }

  const { gastosPorCategoria = [], evolucionAhorro = [], ingresosVsGastos = [] } = graficas;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Gastos por categoría</h2>
        {gastosPorCategoria.length === 0 ? (
          <p className="text-gray-500 text-sm">No se encontraron registros para este período.</p>
        ) : (
          <div className="space-y-4">
            {gastosPorCategoria.map((categoria) => {
              const total = categoria.total ?? 0;
              const max = Math.max(...gastosPorCategoria.map((g) => g.total ?? 0));
              const porcentaje = max === 0 ? 0 : Math.round((total / max) * 100);
              return (
                <div key={categoria.categoria} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{categoria.categoria}</span>
                    <span className="text-white font-medium">{currency.format(total)}</span>
                  </div>
                  <div className="h-2 bg-[#11142D] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F76B1C] to-[#FAD961]"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Evolución del ahorro</h2>
        {evolucionAhorro.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay datos históricos de ahorro disponibles.</p>
        ) : (
          <ul className="space-y-3">
            {evolucionAhorro.map((registro) => (
              <li
                key={`${registro.mes}-${registro.ahorro}`}
                className="flex items-center justify-between bg-[#11142D] rounded-lg px-4 py-3 border border-[#2A2F4A]"
              >
                <div>
                  <p className="text-white font-medium">{registro.mes}</p>
                  <p className="text-gray-400 text-sm">Ahorro acumulado</p>
                </div>
                <p className="text-[#F0B90B] font-semibold">
                  {currency.format(registro.ahorro ?? 0)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {ingresosVsGastos && ingresosVsGastos.length > 0 && (
        <div className="lg:col-span-2 bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Ingresos vs Gastos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ingresosVsGastos.slice(0, 6).map((item) => (
              <div key={`${item.mes}-${item.ingresos}`} className="p-4 bg-[#11142D] rounded-lg border border-[#2A2F4A]">
                <p className="text-sm text-gray-400 mb-1">{item.mes}</p>
                <p className="text-white text-lg font-semibold">
                  {currency.format(item.ingresos ?? 0)}
                  <span className="text-xs text-gray-500 ml-1">Ingresos</span>
                </p>
                <p className="text-red-400 text-lg font-semibold">
                  {currency.format(item.gastos ?? 0)}
                  <span className="text-xs text-gray-500 ml-1">Gastos</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


