"use client";

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio", href: "#" },
    { name: "Productos", href: "#" },
    { name: "Categorías", href: "#" },
    { name: "Ofertas", href: "#" },
    { name: "Contacto", href: "#" }
  ];

  const categories = [
    { name: "Alimentos", href: "#" },
    { name: "Juguetes", href: "#" },
    { name: "Accesorios", href: "#" },
    { name: "Salud", href: "#" },
    { name: "Higiene", href: "#" }
  ];

  return (
    <header className="bg-gradient-to-r from-black to-green-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-black py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>🚚 Envío gratis en compras superiores a $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-green-400 transition-colors">Seguimiento</a>
            <a href="#" className="hover:text-green-400 transition-colors">Ayuda</a>
            <a href="#" className="hover:text-green-400 transition-colors">Mi cuenta</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gradient-to-r from-black to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-green-400">Amazona</span> Home
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-400 hover:bg-green-900 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Search and Actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-64 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400">
                    🔍
                  </button>
                </div>

                {/* Cart and User */}
                <button className="p-2 rounded-full hover:bg-green-900 transition-colors">
                  🛒
                </button>
                <button className="p-2 rounded-full hover:bg-green-900 transition-colors">
                  👤
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-400 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Abrir menú principal</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-black to-green-900">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-green-400 hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Categories Bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-3">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="text-white hover:text-green-300 font-medium text-sm transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}