"use client";

import { memo } from 'react';

const Footer = memo(function Footer() {
  const footerLinks = [
    {
      title: "Productos",
      links: [
        { name: "Alimentos", href: "/alimentos" },
        { name: "Juguetes", href: "/juguetes" },
        { name: "Camas", href: "/camas" },
        { name: "Accesorios", href: "/accesorios" },
        { name: "Higiene", href: "/higiene" }
      ]
    },
    {
      title: "Servicios",
      links: [
        { name: "Entrega Rápida", href: "/entrega" },
        { name: "Asesoría Veterinaria", href: "/asesoria" },
        { name: "Programa Fidelidad", href: "/fidelidad" },
        { name: "Garantías", href: "/garantias" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", href: "/nosotros" },
        { name: "Trabaja con Nosotros", href: "/trabaja" },
        { name: "Sostenibilidad", href: "/sostenibilidad" },
        { name: "Prensa", href: "/prensa" }
      ]
    },
    {
      title: "Atención al Cliente",
      links: [
        { name: "Centro de Ayuda", href: "/ayuda" },
        { name: "Contacto", href: "/contacto" },
        { name: "Devoluciones", href: "/devoluciones" },
        { name: "FAQ", href: "/faq" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/amazonahome", icon: "facebook" },
    { name: "Instagram", href: "https://instagram.com/amazonahome", icon: "instagram" },
    { name: "Twitter", href: "https://twitter.com/amazonahome", icon: "twitter" },
    { name: "YouTube", href: "https://youtube.com/amazonahome", icon: "youtube" }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">AH</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Amazona Home
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Tu tienda de confianza para productos premium para mascotas. 
              Ofrecemos la mejor selección de alimentos, accesorios y cuidados 
              para tu compañero animal.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                    <span className="text-xs font-semibold">{social.icon.charAt(0).toUpperCase()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Amazona Home. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacidad" className="text-gray-400 hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="/terminos" className="text-gray-400 hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>Amazona Home - Cuidando a tus compañeros desde 2020</p>
          <p className="mt-1">Dirección: Calle Mascotas 123, Ciudad Animal</p>
          <p className="mt-1">Teléfono: +34 900 123 456 | Email: info@amazonahome.com</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;