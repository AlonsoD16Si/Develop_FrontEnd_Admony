"use client";

import { Usuario } from "@/lib/dashboard.service";

interface UserProfileCardProps {
  usuario?: Usuario;
  loading?: boolean;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function UserProfileCard({ usuario, loading = false }: UserProfileCardProps) {
  if (loading) {
    return (
      <div className="bg-[#1A1F3A]/80 border border-[#2A2F4A] rounded-xl p-6 animate-pulse">
        <div className="h-5 w-48 bg-[#2A2F4A] rounded mb-3"></div>
        <div className="h-4 w-32 bg-[#2A2F4A] rounded mb-6"></div>
        <div className="h-10 bg-[#2A2F4A] rounded"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="bg-[#1A1F3A]/80 border border-dashed border-[#2A2F4A] rounded-xl p-6">
        <p className="text-white font-semibold mb-2">Perfil del usuario</p>
        <p className="text-gray-400 text-sm">No se encontró información del usuario.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F3A]/80 border border-[#2A2F4A] rounded-xl p-6">
      <p className="text-sm text-gray-400">Usuario</p>
      <h3 className="text-2xl font-semibold text-white mb-1">{usuario.nombre}</h3>
      <p className="text-xs text-gray-500 mb-4">ID #{usuario.id}</p>
      <div className="p-4 bg-[#11142D] rounded-lg border border-[#2A2F4A]">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Saldo actual</p>
        <p className="text-3xl font-semibold text-white">
          {currency.format(usuario.saldoActual ?? 0)}
        </p>
      </div>
    </div>
  );
}


