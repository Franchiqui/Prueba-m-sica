"use client";

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 1, name: "Alimentos", count: 45 },
    { id: 2, name: "Juguetes", count: 32 },
    { id: 3, name: "Camas y Casas", count: 28 },
    { id: 4, name: "Higiene", count: 36 },
    { id: 5, name: "Transporte", count: 15 },
    { id: 6, name: "Accesorios", count: 52 }
  ];

  const filters = [
    { id: 1, name: "Precio", options: ["Menor a $50", "$50 - $100", "$100 - $200", "Más de $200"] },
    { id: 2, name: "Marca", options: ["Royal Canin", "Purina", "Hill's", "Pedigree"] },
    { id: 3, name: "Tamaño", options: ["Pequeño", "Mediano", "Grande"] }
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-black to-green-900 text-white h-screen overflow-y-auto sticky top-0">
      <div className="p-6 border-b border-green-600">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
          Amazona Home
        </h2>
        <p className="text-green-300 text-sm mt-2">Tu tienda para mascotas felices</p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-300">Categorías</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200 flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="bg-green-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-300">Filtros</h3>
          <div className="space-y-4">
            {filters.map((filter) => (
              <div key={filter.id}>
                <h4 className="font-medium mb-2 text-green-200">{filter.name}</h4>
                <div className="space-y-1">
                  {filter.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-green-400 text-green-600 focus:ring-green-500" />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-300">Ofertas Especiales</h3>
          <div className="bg-gradient-to-r from-green-800 to-black p-4 rounded-lg border border-green-600">
            <p className="text-sm font-medium">Descuento del 20%</p>
            <p className="text-xs text-green-300 mt-1">En alimentos premium</p>
            <button className="mt-3 w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Aplicar Cupón
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-300">Marcas Destacadas</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Royal Canin', 'Purina', "Hill's", 'Pedigree'].map((brand, index) => (
              <div key={index} className="bg-green-800 bg-opacity-50 p-2 rounded text-center text-xs">
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-green-600 pt-6">
          <button className="w-full bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>Limpiar Filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
}