import { apiRequest } from "./api";

// Tipos para las respuestas de la API
export interface Usuario {
  id: number;
  nombre: string;
  saldoActual: number;
}

export interface ResumenFinanciero {
  totalIngresos: number;
  totalExtras: number;
  totalGastos: number;
  saldoActual: number;
  ahorroTotal: number;
  porcentajeAhorro: number;
  balanceNeto: number;
}

export interface Transaccion {
  monto: number;
  descripcion: string;
  categoria?: string;
  fecha: string;
}

export interface GastosPorCategoria {
  categoria: string;
  total: number;
  transacciones?: Transaccion[];
}

export interface ObjetivoAhorro {
  objetivo: string;
  montoAhorrado: number;
  montoMeta: number;
  progreso: number;
  descripcion: string;
}

export interface DetalleFinanciero {
  ingresos: {
    total: number;
    transacciones: Transaccion[];
  };
  gastos: {
    total: number;
    porCategoria: GastosPorCategoria[];
    transacciones: Transaccion[];
  };
  extras: {
    total: number;
    transacciones: Transaccion[];
  };
  ahorros: {
    total: number;
    objetivos: ObjetivoAhorro[];
  };
}

export interface FinancialSummaryResponse {
  usuario: Usuario;
  resumen: ResumenFinanciero;
  detalle: DetalleFinanciero;
}

export interface Tendencia {
  mesActual?: string;
  mesAnterior?: string;
  ingresosActual?: number;
  ingresosAnterior?: number;
  gastosActual?: number;
  gastosAnterior?: number;
  variacionGastos?: number;
  variacionIngresos?: number;
  mensaje: string;
  tipo: string;
}

export interface TrendsResponse {
  tendencia: Tendencia;
}

export interface ChartDataExpenses {
  tipo: "gastosPorCategoria";
  datos: {
    categoria: string;
    total: number;
  }[];
}

export interface ChartDataSavings {
  tipo: "evolucionAhorro";
  datos: {
    mes: string;
    ahorro: number;
  }[];
}

export interface ChartDataIncome {
  tipo: "ingresosVsGastos";
  datos: {
    mes: string;
    ingresos: number;
    gastos: number;
  }[];
}

export type ChartDataResponse =
  | ChartDataExpenses
  | ChartDataSavings
  | ChartDataIncome;

export interface Alerta {
  tipo: "exito" | "advertencia" | "info";
  mensaje: string;
  severidad: "baja" | "media" | "alta";
}

export interface MiembroOrganizacion {
  id: number;
  nombre: string;
  rol: string;
  saldoActual: number;
}

export interface ResumenOrganizacion {
  totalMiembros: number;
  saldoTotal: number;
  ahorroTotal: number;
  ingresosMes: number;
  gastosMes: number;
  balanceNeto: number;
  porcentajeAhorro: number;
}

export interface AnalisisOrganizacion {
  gastosPorCategoria: {
    categoria: string;
    total: number;
    cantidadTransacciones: number;
  }[];
  topGastadores: {
    nombre: string;
    totalGastado: number;
  }[];
}

export interface Organizacion {
  id: number;
  nombre: string;
  rolUsuario: string;
  miembros: MiembroOrganizacion[];
  resumen: ResumenOrganizacion;
  analisis: AnalisisOrganizacion;
}

export interface GraficasDashboard {
  gastosPorCategoria: {
    categoria: string;
    total: number;
  }[];
  evolucionAhorro: {
    mes: string;
    ahorro: number;
  }[];
  ingresosVsGastos?: {
    mes: string;
    ingresos: number;
    gastos: number;
  }[];
}

export interface DashboardDataResponse {
  usuario: Usuario;
  resumen: ResumenFinanciero;
  detalle: DetalleFinanciero;
  graficas: GraficasDashboard;
  alertas: Alerta[];
  tendencias: Tendencia;
  organizacion?: Organizacion;
}

/**
 * Obtiene el resumen financiero completo del usuario
 * @param userId ID del usuario
 * @returns Resumen financiero con detalles
 */
export async function getFinancialSummary(
  userId: number
): Promise<FinancialSummaryResponse> {
  const response = await apiRequest(`/api/dashboard/summary?userId=${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al obtener el resumen financiero");
  }

  const result = await response.json();
  // La API devuelve { success: true, data: {...} }
  if (result.success && result.data) {
    return result.data;
  }
  // Si no tiene la estructura esperada, devolver el resultado directamente
  return result;
}

/**
 * Analiza las tendencias financieras mes a mes
 * @param userId ID del usuario
 * @returns Tendencias financieras comparativas
 */
export async function getTrends(userId: number): Promise<TrendsResponse> {
  const response = await apiRequest(`/api/dashboard/trends?userId=${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al obtener las tendencias");
  }

  const result = await response.json();
  // La API devuelve { success: true, data: {...} }
  if (result.success && result.data) {
    return result.data;
  }
  // Si no tiene la estructura esperada, devolver el resultado directamente
  return result;
}

/**
 * Obtiene datos para alimentar gráficas del dashboard
 * @param userId ID del usuario
 * @param type Tipo de gráfica ('expenses', 'savings', 'income')
 * @param period Período de tiempo (opcional, 'monthly' por defecto)
 * @returns Datos formateados para la gráfica solicitada
 */
export async function getChartData(
  userId: number,
  type: "expenses" | "savings" | "income",
  period: string = "monthly"
): Promise<ChartDataResponse> {
  const response = await apiRequest(
    `/api/dashboard/charts?userId=${userId}&type=${type}&period=${period}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(
      error.message || "Error al obtener los datos de la gráfica"
    );
  }

  const result = await response.json();
  // La API devuelve { success: true, data: {...} }
  if (result.success && result.data) {
    return result.data;
  }
  // Si no tiene la estructura esperada, devolver el resultado directamente
  return result;
}

/**
 * Genera alertas inteligentes sobre la salud financiera del usuario
 * @param userId ID del usuario
 * @returns Array de alertas financieras
 */
export async function getAlerts(userId: number): Promise<Alerta[]> {
  const response = await apiRequest(`/api/dashboard/alerts?userId=${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al obtener las alertas");
  }

  const result = await response.json();
  // La API devuelve { success: true, data: {...} }
  // Para alertas, puede ser un array directo o estar en data
  if (result.success && result.data) {
    return Array.isArray(result.data) ? result.data : result.data;
  }
  // Si no tiene la estructura esperada, devolver el resultado directamente
  return Array.isArray(result) ? result : result;
}

/**
 * Obtiene todos los datos necesarios para el dashboard completo
 * Incluye datos personales y organizacionales si aplica
 * @param userId ID del usuario
 * @returns Datos completos del dashboard
 */
export async function getDashboardData(
  userId: number
): Promise<DashboardDataResponse> {
  const response = await apiRequest(`/api/dashboard/all?userId=${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(
      error.message || "Error al obtener los datos del dashboard"
    );
  }

  const result = await response.json();
  // La API devuelve { success: true, data: {...} }
  if (result.success && result.data) {
    return result.data;
  }
  // Si no tiene la estructura esperada, devolver el resultado directamente
  return result;
}
