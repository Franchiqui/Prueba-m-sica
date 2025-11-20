"use client";

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de mascotas",
      content: "Los productos de Amazona Home son excelentes. Mi perro adora la comida premium y los juguetes son muy duraderos.",
      image: "https://images.unsplash.com/photo-1739300293388-c28c70ae80e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Veterinario",
      content: "Recomiendo Amazona Home a todos mis clientes. La calidad de sus productos es excepcional y los precios son justos.",
      image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Criadora profesional",
      content: "He comprado suministros para mis gatos durante años y Amazona Home nunca me ha decepcionado. Servicio impecable.",
      image: "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David López",
      role: "Adiestrador canino",
      content: "Los accesorios de entrenamiento son de primera calidad. Mis clientes siempre quedan satisfechos con los productos.",
      image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Sánchez",
      role: "Dueña de mascotas exóticas",
      content: "Encontré todo lo que necesitaba para mi hurón. La variedad de productos es increíble y el envío fue rápido.",
      image: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Roberto Fernández",
      role: "Refugio animal",
      content: "Amazona Home nos ha apoyado con donaciones regulares. Sus productos son confiables y nuestros animales los aman.",
      image: "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1739300293388-c28c70ae80e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Productos para perros"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Alimentos premium"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Juguetes para gatos"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Accesorios de calidad"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Camas cómodas"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Productos veterinarios"
    }
  ];

  const categories = [
    { id: 1, name: "Alimentos", icon: "🍖" },
    { id: 2, name: "Juguetes", icon: "🎾" },
    { id: 3, name: "Camas", icon: "🛏️" },
    { id: 4, name: "Accesorios", icon: "🐕" },
    { id: 5, name: "Salud", icon: "❤️" },
    { id: 6, name: "Higiene", icon: "🚿" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gradient-to-r from-black to-green-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">🐾</span>
              <span className="text-xl font-bold">Amazona Home</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="hover:text-green-300 transition-colors">Inicio</a>
              <a href="#productos" className="hover:text-green-300 transition-colors">Productos</a>
              <a href="#testimonios" className="hover:text-green-300 transition-colors">Testimonios</a>
              <a href="#galeria" className="hover:text-green-300 transition-colors">Galería</a>
              <a href="#contacto" className="hover:text-green-300 transition-colors">Contacto</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-48"
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors">
                Carrito
              </button>
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="hover:text-green-300 transition-colors">Inicio</a>
                <a href="#productos" className="hover:text-green-300 transition-colors">Productos</a>
                <a href="#testimonios" className="hover:text-green-300 transition-colors">Testimonios</a>
                <a href="#galeria" className="hover:text-green-300 transition-colors">Galería</a>
                <a href="#contacto" className="hover:text-green-300 transition-colors">Contacto</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="bg-gradient-to-br from-black via-green-900 to-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Todo para tu 
            <span className="text-green-400"> mejor amigo</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Descubre la mejor selección de productos para mascotas con calidad premium y servicio excepcional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
              Ver Productos
            </button>
            <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      <section id="productos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nuestras Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 p-6 text-center cursor-pointer">
                <div className="text-4xl mb -3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb -12 text-gray -800">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols -1 md:grid-cols -2 lg:grid-cols -3 gap -8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-gray -50 to-white rounded-xl shadow-lg p -6 hover:shadow-xl transition-all">
                <div className="flex items-center mb -4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w -12 h -12 rounded-full object -cover mr -4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray -800">{testimonial.name}</h3>
                    <p className="text-green -600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray -600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="py -16 bg-gray -50">
        <div className="container mx-auto px -6">
          <h2 className="text -4xl font-bold text-center mb -12 text-gray -800">Nuestra Galería</h2>
          <div className="grid grid-cols -1 md:grid-cols -2 lg:grid-cols -3 gap -6">
            {galleryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y -1">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h -64 object -cover hover:scale -110 transition-transform duration -500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-gradient-to-r from-black to-green -900 text-white py -12">
        <div className="container mx-auto px -6">
          <div className="grid grid-cols -1 md:grid-cols -4 gap -8">
            <div>
              <h3 className="text-xl font-bold mb -4">Amazona Home</h3>
              <p className="text-gray -300">
                Tu tienda de confianza para productos de mascotas de la más alta calidad.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb -4">Enlaces Rápidos</h4>
              <ul className="space-y -2">
                <li><a href="#inicio" className="text-gray -300 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#product})