"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const passwordChecks = useMemo(() => {
    const password = formData.password;
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  }, [formData.password]);

  const strengthScore = Object.values(passwordChecks).filter(Boolean).length;
  const strengthLevels = [
    { label: "Muy débil", color: "bg-red-500" },
    { label: "Débil", color: "bg-orange-500" },
    { label: "Aceptable", color: "bg-yellow-500" },
    { label: "Fuerte", color: "bg-green-500" },
    { label: "Muy fuerte", color: "bg-emerald-400" },
  ];
  const strength =
    strengthLevels[Math.min(strengthScore, strengthLevels.length - 1)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor, completa todos los campos");
      return false;
    }

    if (!passwordChecks.length) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }

    if (
      !passwordChecks.uppercase ||
      !passwordChecks.lowercase ||
      !passwordChecks.number ||
      !passwordChecks.special
    ) {
      setError(
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)"
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          correo: formData.email,
          contrasenia: formData.password,
          nombre: `${formData.nombre} ${formData.apellido}`.trim(),
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(
          `Error del servidor (${response.status}): ${response.statusText}`
        );
      }

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Error al registrar usuario. Por favor, intenta nuevamente."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem(
        "userName",
        `${formData.nombre} ${formData.apellido}`
      );

      router.push("/private");
    } catch (error) {
      console.error("Error en el registro:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError(
          "No se pudo conectar con el servidor. Verifica que el servidor esté corriendo y que la URL sea correcta."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error de conexión. Por favor, intenta nuevamente.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Link href="/">
              <Image
                src="/logo_bg_black.png"
                alt="AdmonY Logo"
                width={190}
                height={55}
                className="h-16 w-auto brightness-0 invert"
                priority
              />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-gray-400">
            Únete a AdmonY y toma control de tus finanzas
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-[#1A1F3A]/80 backdrop-blur-sm border border-[#2A2F4A] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F4A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:border-transparent transition-all"
                placeholder="Juan"
                required
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F4A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:border-transparent transition-all"
                placeholder="Pérez"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F4A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:border-transparent transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F4A] rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#F0B90B] focus:border-transparent transition-all pr-12"
                placeholder="Mínimo 8 caracteres"
                required
              />

              {/* Ojo */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Fortaleza de la contraseña</span>
                  <span className="text-white font-semibold">
                    {strength.label}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#2A2F4A] rounded-full overflow-hidden">
                  <div
                    className={`${strength.color} h-full transition-all duration-300`}
                    style={{
                      width: `${
                        (strengthScore / strengthLevels.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: "uppercase", label: "Una mayúscula (A-Z)" },
                    { key: "lowercase", label: "Una minúscula (a-z)" },
                    { key: "number", label: "Un número (0-9)" },
                    { key: "special", label: "Un caracter especial (@$!%*?&)" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full border ${
                          passwordChecks[key as keyof typeof passwordChecks]
                            ? "bg-green-400 border-green-400"
                            : "border-gray-500"
                        }`}
                      ></span>
                      <span className="text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirmar Contraseña
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F4A] rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#F0B90B] focus:border-transparent transition-all pr-12"
                placeholder="Confirma tu contraseña"
                required
              />

              {/* Ojo */}
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-11 text-gray-400 hover:text-white"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#2A2F4A] bg-[#0A0E27] text-[#F0B90B] focus:ring-[#F0B90B] focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                Acepto los{" "}
                <a
                  href="#"
                  className="text-[#F0B90B] hover:text-[#F5C842] transition-colors underline"
                >
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="#"
                  className="text-[#F0B90B] hover:text-[#F5C842] transition-colors underline"
                >
                  política de privacidad
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-[#F0B90B] to-[#F5C842] text-[#0A0E27] font-semibold rounded-lg hover:from-[#F5C842] hover:to-[#F0B90B] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#F0B90B]/20"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-[#F0B90B] hover:text-[#F5C842] font-medium transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Seguridad */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Conexión segura SSL • Datos encriptados</span>
          </div>
        </div>
      </div>
    </div>
  );
}
