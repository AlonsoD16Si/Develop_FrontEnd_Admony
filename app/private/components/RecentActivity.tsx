"use client";

import { Transaccion } from "@/lib/dashboard.service";

interface TransaccionConTipo extends Transaccion {
  tipo?: "ingreso" | "gasto" | "extra";
}

interface RecentActivityProps {
  transacciones: TransaccionConTipo[];
  loading?: boolean;
}

export default function RecentActivity({
  transacciones,
  loading = false,
}: RecentActivityProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-[#2A2F4A] rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (transacciones.length === 0) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Actividad Reciente
        </h2>
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500">No hay transacciones aún</p>
        </div>
      </div>
    );
  }

  // Combinar todas las transacciones y ordenarlas por fecha
  const allTransactions = transacciones
    .map((t) => ({
      ...t,
      fecha: new Date(t.fecha),
    }))
    .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
    .slice(0, 10); // Mostrar solo las últimas 10

  return (
    <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Actividad Reciente
      </h2>
      <div className="space-y-3">
        {allTransactions.map((transaccion, index) => {
          // Determinar si es ingreso basado en el tipo o el signo del monto
          const isIngreso =
            transaccion.tipo === "ingreso" ||
            transaccion.tipo === "extra" ||
            (transaccion.tipo === undefined && transaccion.monto > 0);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#2A2F4A] rounded-lg hover:bg-[#3A3F5A] transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isIngreso
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {isIngreso ? (
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ) : (
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
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {transaccion.descripcion}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-gray-400 text-sm">
                      {formatDate(transaccion.fecha.toString())}
                    </p>
                    {transaccion.categoria && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400 text-sm">
                          {transaccion.categoria}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <p
                  className={`text-lg font-semibold ${
                    isIngreso ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isIngreso ? "+" : "-"}
                  {formatCurrency(Math.abs(transaccion.monto))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
