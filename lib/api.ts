// Configuración de la API
// La URL se obtiene de la variable de entorno NEXT_PUBLIC_API_URL
// Si no está definida, usa el valor por defecto para desarrollo local
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Función helper para hacer peticiones a la API
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Si hay un token en localStorage, agregarlo a los headers
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(url, config);
}
