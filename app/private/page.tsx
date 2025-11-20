"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getDashboardData,
  DashboardDataResponse,
} from "@/lib/dashboard.service";
import SummaryCards from "./components/SummaryCards";
import Alerts from "./components/Alerts";
import RecentActivity from "./components/RecentActivity";

export default function PrivateDashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [dashboardData, setDashboardData] =
    useState<DashboardDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");

    if (email) {
      setUserEmail(email);
    }
    if (name) {
      setUserName(name);
    }
    if (id) {
      setUserId(parseInt(id, 10));
    } else {
      // Si no hay userId, redirigir al login
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardData(userId);
        setDashboardData(data);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar los datos del dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27]">
      {/* Navbar */}
      <nav className="bg-[#1A1F3A]/80 backdrop-blur-sm border-b border-[#2A2F4A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo_bg_black.png"
                alt="AdmonY Logo"
                width={150}
                height={44}
                className="h-10 w-auto brightness-0 invert"
                priority
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-400">{userEmail}</p>
                <p className="text-xs text-gray-500">Panel de Control</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#2A2F4A] text-gray-300 rounded-lg hover:bg-[#3A3F5A] transition-colors text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenido de vuelta{userName ? `, ${userName}` : ""}
          </h1>
          <p className="text-gray-400">
            Gestiona tus finanzas desde tu panel de control
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
            <div className="flex items-center space-x-2">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {dashboardData && dashboardData.resumen ? (
          <SummaryCards
            resumen={{
              totalIngresos: dashboardData.resumen.totalIngresos || 0,
              totalExtras: dashboardData.resumen.totalExtras || 0,
              totalGastos: dashboardData.resumen.totalGastos || 0,
              saldoActual: dashboardData.resumen.saldoActual || 0,
              ahorroTotal: dashboardData.resumen.ahorroTotal || 0,
              porcentajeAhorro: dashboardData.resumen.porcentajeAhorro || 0,
              balanceNeto: dashboardData.resumen.balanceNeto || 0,
            }}
            tendencias={dashboardData.tendencias}
            loading={loading}
          />
        ) : (
          <SummaryCards
            resumen={{
              totalIngresos: 0,
              totalExtras: 0,
              totalGastos: 0,
              saldoActual: 0,
              ahorroTotal: 0,
              porcentajeAhorro: 0,
              balanceNeto: 0,
            }}
            loading={loading}
          />
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Actividad Reciente */}
          <div className="lg:col-span-2">
            {dashboardData && dashboardData.detalle ? (
              <RecentActivity
                transacciones={[
                  ...(dashboardData.detalle.ingresos?.transacciones || []).map(
                    (t) => ({
                      ...t,
                      tipo: "ingreso" as const,
                    })
                  ),
                  ...(dashboardData.detalle.gastos?.transacciones || []).map(
                    (t) => ({
                      ...t,
                      tipo: "gasto" as const,
                    })
                  ),
                  ...(dashboardData.detalle.extras?.transacciones || []).map(
                    (t) => ({
                      ...t,
                      tipo: "extra" as const,
                    })
                  ),
                ]}
                loading={loading}
              />
            ) : (
              <RecentActivity transacciones={[]} loading={loading} />
            )}
          </div>

          {/* Alertas y Accesos Rápidos */}
          <div className="space-y-6">
            {/* Alertas */}
            {dashboardData && dashboardData.alertas ? (
              <Alerts alertas={dashboardData.alertas} loading={loading} />
            ) : (
              <Alerts alertas={[]} loading={loading} />
            )}

            {/* Accesos Rápidos */}
            <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Accesos Rápidos
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-[#2A2F4A] hover:bg-[#3A3F5A] text-white rounded-lg transition-colors text-left flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-[#F0B90B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Nueva Transacción</span>
                </button>
                <button className="w-full px-4 py-3 bg-[#2A2F4A] hover:bg-[#3A3F5A] text-white rounded-lg transition-colors text-left flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-[#F0B90B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Ver Reportes</span>
                </button>
                <button className="w-full px-4 py-3 bg-[#2A2F4A] hover:bg-[#3A3F5A] text-white rounded-lg transition-colors text-left flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-[#F0B90B]"
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
                  <span>Configurar Presupuesto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
