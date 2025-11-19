"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#problema", label: "Problema" },
    { href: "#solucion", label: "Solución" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#beneficios", label: "Beneficios" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#F7F9FA]/95 backdrop-blur-sm shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="shrink-0">
            <Image
              src="/logo_bg_black.png"
              alt="AdmonY Logo"
              width={190}
              height={55}
              className="h-12 md:h-16 w-auto"
              priority
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#1E1E1E] hover:text-[#0A3A63] transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/login")}
              className="hidden md:block px-6 py-2 
  bg-[#00BFA6] text-white font-semibold rounded-lg
  transition-all hover:bg-[#27a561] hover:scale-[1.02]
  shadow-sm hover:shadow-md
  
  "
            >
              Iniciar Sesión
            </button>


            <button
              className="md:hidden p-2 text-[#1E1E1E] hover:text-[#0A3A63] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-[#F7F9FA] rounded-lg mt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-[#1E1E1E] hover:text-[#0A3A63] hover:bg-white/50 transition-colors font-medium rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                router.push("/login");
                setMobileMenuOpen(false);
              }}
              className="w-full mx-4 px-6 py-2 bg-gradient-to-r from-[#F0B90B] to-[#F5C842] text-[#0A0E27] rounded-lg hover:from-[#F5C842] hover:to-[#F0B90B] transition-all font-semibold shadow-lg shadow-[#F0B90B]/20"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
