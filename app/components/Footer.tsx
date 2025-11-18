import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
          <Image
        src="/logo.png"
        alt="AdmonY Logo"
        width={190}
        height={55}
        className="h-12 md:h-16 w-auto"
        priority
      />
            <p className="text-gray-400">
              Administración inteligente de finanzas personales.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#caracteristicas" className="hover:text-white transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#solucion" className="hover:text-white transition-colors">
                  Solución
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AdmonY. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

