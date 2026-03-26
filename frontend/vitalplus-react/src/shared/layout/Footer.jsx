const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Marca y descripcion */}
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-slate-900">
              VitalPlus
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Plataforma enfocada en el acceso a productos, servicios y
              categorias relacionadas con salud y bienestar.
            </p>
          </div>

          {/* Informacion de contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contacto
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href="https://vitalplus.co"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-sky-700"
                >
                  VitalPlus.co
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/VitalPlusCo"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-sky-700"
                >
                  Instagram: @VitalPlusCo
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Informacion legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="/contacto" className="transition hover:text-sky-700">
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="/terminos-y-condiciones"
                  className="transition hover:text-sky-700"
                >
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linea inferior */}
        <div className="mt-8 border-t border-slate-200 pt-4">
          <p className="text-center text-sm text-slate-500">
            © {currentYear} VitalPlus. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;