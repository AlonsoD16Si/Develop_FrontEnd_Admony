
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ;

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

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
