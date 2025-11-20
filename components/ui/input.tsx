"use client";

import { useState } from 'react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de 2 gatos",
      content: "Los productos de Amazona Home son excelentes calidad. Mis gatos adoran la comida y los juguetes.",
      image: "https://images.unsplash.com/photo-1739300293388-c28c70ae80e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Dueño de perro",
      content: "La atención al cliente es increíble y los precios muy competitivos. Recomiendo totalmente.",
      image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Ana López",
      role: "Veterinaria",
      content: "Como profesional, confío en los productos de Amazona Home para recomendar a mis clientes.",
      image: "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David Martínez",
      role: "Dueño de mascotas exóticas",
      content: "Encontré productos especializados que no conseguía en otras tiendas. Muy satisfecho.",
      image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Sánchez",
      role: "Rescatista",
      content: "Amazona Home siempre apoya a los refugios y ofrece productos de primera calidad.",
      image: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Roberto Jiménez",
      role: "Cliente frecuente",
      content: "La entrega siempre es rápida y los productos llegan en perfecto estado. Excelente servicio.",
      image: "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    }
  ];

  const categories = [
    { name: "Alimentos", icon: "🍖" },
    { name: "Juguetes", icon: "🎾" },
    { name: "Camas", icon: "🛏️" },
    { name: "Higiene", icon: "🧴" },
    { name: "Transporte", icon: "🚗" },
    { name: "Accesorios", icon: "🐕" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Amazona Home
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="hover:text-green-400 transition-colors">Inicio</a>
              <a href="#productos" className="hover:text-green-400 transition-colors">Productos</a>
              <a href="#categorias" className="hover:text-green-400 transition-colors">Categorías</a>
              <a href="#testimonios" className="hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#contacto" className="hover:text-green-400 transition-colors">Contacto</a>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-white"></span>
                <span className="w-full h-0.5 bg-white"></span>
                <span className="w-full h-0.5 bg-white"></span>
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#inicio" className="block hover:text-green-400 transition-colors">Inicio</a>
              <a href="#productos" className="block hover:text-green-400 transition-colors">Productos</a>
              <a href="#categorias" className="block hover:text-green-400 transition-colors">Categorías</a>
              <a href="#testimonios" className="block hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#contacto" className="block hover:text-green-400 transition-colors">Contacto</a>
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Todo para tu 
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"> mascota</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Descubre la mejor selección de productos para animales de compañía. Calidad, variedad y el mejor servicio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Ver Productos
            </button>
            <button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      <section id="categorias" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nuestras Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center cursor-pointer border border-gray-200">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-green-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-black to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text -3xl md:text -4xl font-bold mb -6">¿Listo para consentir a tu mascota?</h2>
          <p className="text-xl mb -8 text-gray -300 max-w -2xl mx-auto">
            Únete a miles de dueños satisfechos que confían en Amazona Home para el bienestar de sus animales.
          </p>
          <button className="bg-white text-black hover:bg-gray -100 px -8 py -4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
            Comprar Ahora
          </button>
        </div>
      </section>

      <footer id="contacto" className="bg-black text-white py1 2">
        <div className="container mx-auto px -4">
          <div className="grid grid-cols -1 md:grid-cols -4 gap -8">
            <div className="md:col-span -2">
              <h3 className="text -2xl font-bold mb -4 bg-gradient-to-r from-green -400 to-green -600 bg-clip-text text-transparent">
                Amazona Home
              </h3>
              <p className="text-gray -400 mb -4">
                Tu tienda de confianza para productos de mascotas y animales de compañía.
              </p>
              <div className="flex space-x -4">
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Facebook</a>
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Instagram</a>
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Twitter</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb -4">Enlaces Rápidos</h4>
              <ul className="space-y -2 text-gray -400">
                <li><a href="#inicio" className="hover:text-green -400 transition-colors">Inicio</a></li>
                <li><a href="#productos" className="hover:text-green -400 transition-colors">Productos</a></li>
                <li><a href="#categorias" className="hover:text-green -400 transition-colors">Categorías</a></li>
                <li><a href="#testimonios" className="hover:text-green -400 transition-colors">Testimonios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb -4">Contacto</h4>
              <ul className="space-y -2 text-gray -400">
                <li>📧 info@amazonahome.com</li>
                <li>📞 +1 (555) 123 -4567</li>
                <li>📍 123 Pet Street, Ciudad</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray -800 mt -8 pt -8 text-center text-gray -500">
            <p>&copy; 2024 Amazona Home. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}