"use client";

import { Organizacion } from "@/lib/dashboard.service";

interface OrganizationOverviewProps {
  organizacion?: Organizacion;
  loading?: boolean;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function OrganizationOverview({
  organizacion,
  loading = false,
}: OrganizationOverviewProps) {
  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
        <div className="h-6 w-48 bg-[#2A2F4A] rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-[#2A2F4A] rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-32 bg-[#2A2F4A] rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (!organizacion) {
    return (
      <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-dashed border-[#2A2F4A] rounded-xl p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a3 3 0 11-6 0 3 3 0 016 0zm-12 0a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-white font-semibold">Sin organización vinculada</p>
          <p className="text-gray-400 text-sm">
            Este usuario aún no forma parte de una organización o familia financiera.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">Organización</p>
          <h2 className="text-2xl font-semibold text-white">{organizacion.nombre}</h2>
          <p className="text-xs text-gray-500">
            Rol del usuario: {organizacion.rolUsuario || "No especificado"}
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#2A2F4A] text-gray-300">
          {organizacion.miembros?.length ?? 0} miembros
        </span>
      </div>

      {organizacion.resumen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D]">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Saldo total</p>
            <p className="text-white text-2xl font-semibold">
              {currency.format(organizacion.resumen.saldoTotal ?? 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D]">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Ahorro total</p>
            <p className="text-[#F0B90B] text-2xl font-semibold">
              {currency.format(organizacion.resumen.ahorroTotal ?? 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D]">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Balance neto</p>
            <p className="text-white text-2xl font-semibold">
              {currency.format(organizacion.resumen.balanceNeto ?? 0)}
            </p>
          </div>
        </div>
      )}

      {organizacion.miembros && organizacion.miembros.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-3">Miembros</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {organizacion.miembros.map((miembro) => (
              <div
                key={miembro.id}
                className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D] flex flex-col"
              >
                <p className="text-white font-semibold">{miembro.nombre}</p>
                <p className="text-xs text-gray-500 mb-2 capitalize">{miembro.rol}</p>
                <p className="text-sm text-gray-400">Saldo</p>
                <p className="text-lg text-white font-semibold">
                  {currency.format(miembro.saldoActual ?? 0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {organizacion.analisis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D]">
            <p className="text-sm text-gray-400 mb-3">Gastos por categoría</p>
            {organizacion.analisis.gastosPorCategoria.length === 0 ? (
              <p className="text-xs text-gray-500">Sin datos disponibles.</p>
            ) : (
              <ul className="space-y-2">
                {organizacion.analisis.gastosPorCategoria.map((categoria) => (
                  <li key={categoria.categoria} className="flex justify-between text-sm">
                    <span className="text-gray-300">{categoria.categoria}</span>
                    <span className="text-white font-medium">
                      {currency.format(categoria.total ?? 0)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 rounded-lg border border-[#2A2F4A] bg-[#11142D]">
            <p className="text-sm text-gray-400 mb-3">Top gastadores</p>
            {organizacion.analisis.topGastadores.length === 0 ? (
              <p className="text-xs text-gray-500">Sin datos disponibles.</p>
            ) : (
              <ul className="space-y-2">
                {organizacion.analisis.topGastadores.map((persona, index) => (
                  <li
                    key={`${persona.nombre}-${index}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-300">{persona.nombre}</span>
                    <span className="text-white font-medium">
                      {currency.format(persona.totalGastado ?? 0)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


