import type { NextConfig } from "next";
import createNextPwa from "next-pwa";
import path from "path";

// Crear el HOC de PWA. Se deshabilita en desarrollo para evitar problemas
// con el servidor de desarrollo y el build local.
const withPWA = createNextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // agrega aquí otras opciones de Next.js si hacen falta
  // Fijar `turbopack.root` evita que Next.js infiera la raíz del workspace
  // de forma incorrecta (varios lockfiles). También dejar una config
  // vacía para silenciar el error cuando un plugin añade un `webpack`.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

// Cast to `any` here to avoid a known typing conflict between `next` and
// `@types/next-pwa` (duplicate Next types). Prefer removing that package
// or aligning types for a cleaner fix.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withPWA(nextConfig as any);
