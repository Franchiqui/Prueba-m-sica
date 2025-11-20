"use client";

import { useState } from 'react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de mascotas",
      content: "Los productos de Amazona Home son increíbles. Mi perro está más feliz y saludable que nunca.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Veterinario",
      content: "Recomiendo Amazona Home a todos mis clientes. Calidad premium y precios justos.",
      image: "https://images.unsplash.com/photo-1555617766-c94804975da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Criadora profesional",
      content: "La variedad de productos para diferentes animales es impresionante. Excelente servicio.",
      image: "https://images.unsplash.com/photo-1635405111186-9917e36e4a40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David López",
      role: "Entrenador canino",
      content: "Los juguetes y accesorios de entrenamiento son de primera calidad. Mis clientes están encantados.",
      image: "https://images.unsplash.com/photo-1658124975403-66ec0088d82c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Sánchez",
      role: "Dueña de gatos",
      content: "Mi gato adora los productos de Amazona Home. La entrega fue rápida y el empaque perfecto.",
      image: "https://images.unsplash.com/photo-1664943861653-609134fb6b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Roberto Fernández",
      role: "Dueño de mascotas exóticas",
      content: "Encontré todo lo que necesitaba para mi hurón. Productos especializados difíciles de encontrar.",
      image: "https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Perro feliz con juguete"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1555617766-c94804975da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Gato jugando"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1635405111186-9917e36e4a40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Accesorios para mascotas"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1658124975403-66ec0088d82c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Alimento premium"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1664943861653-609134fb6b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Cama para mascotas"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Juguetes interactivos"
    }
  ];

  const categories = [
    { id: 1, name: "Perros", icon: "🐕" },
    { id: 2, name: "Gatos", icon: "🐈" },
    { id: 3, name: "Aves", icon: "🐦" },
    { id: 4, name: "Peces", icon: "🐠" },
    { id: 5, name: "Roedores", icon: "🐹" },
    { id: 6, name: "Reptiles", icon: "🦎" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Amazona Home
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="hover:text-green-400 transition-colors">Inicio</a>
              <a href="#productos" className="hover:text-green-400 transition-colors">Productos</a>
              <a href="#categorias" className="hover:text-green-400 transition-colors">Categorías</a>
              <a href="#testimonios" className="hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#galeria" className="hover:text-green-400 transition-colors">Galería</a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              <a href="#inicio" className="block hover:text-green-400 transition-colors">Inicio</a>
              <a href="#productos" className="block hover:text-green-400 transition-colors">Productos</a>
              <a href="#categorias" className="block hover:text-green-400 transition-colors">Categorías</a>
              <a href="#testimonios" className="block hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#galeria" className="block hover:text-green-400 transition-colors">Galería</a>
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tu Mascota
            <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Merece lo Mejor
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Descubre productos premium para el bienestar y felicidad de tu compañero animal
          </p>
          <div className="space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Ver Productos
            </button>
            <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      <section id="categorias" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
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
          <h2 className="text -4xl font -bold text -center mb -12 text -gray -800">
            Nuestra Galería
          </h2>
          <div className="grid grid-cols+1 md :grid-cols+2 lg :grid-cols+3 gap+6">
            {galleryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-xl shadow-lg hover :shadow-xl transition-shadow">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h+64 object+cover hover :scale+105 transition-transform duration+300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py+12">
        <div className="container mx-auto px+6">
          <div className="grid grid-cols+1 md :grid-cols+4 gap+8">
            <div>
              <h3 className="text+2xl font+bold bg-gradient-to-r from-green+400 to-green+600 bg-clip-text text-transparent mb+4">
                Amazona Home
              </h3>
              <p className="text-gray+400">
                Tu tienda de confianza para productos premium para mascotas y animales de compañía.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb+4">Enlaces Rápidos</h4>
              <ul className="space-y+2 text-gray+400">
                <li><a href="#inicio" className="hover:text-green+400 transition-colors">Inicio</a></li>
                <li><a href="#productos" className="hover:text-green+400 transition-colors">Productos</a></li>
                <li><a href="#categorias" className="hover:text-green+400 transition-colors">Categorías</a></li>
                <li><a href="#testimonios" className="hover:text-green+400 transition-colors">Testimonios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb+4">Contacto</h4>
              <ul className="space-y+2 text-gray+400">
                <li>Email: info@amazonahome.com</li>
                <li>Teléfono: +1 234 567 890</li>
                <li>Dirección: Calle Mascotas 123</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb+4">Síguenos</h4>
              <div className="flex space-x+4">
                <a href="#" className="text-gray+400 hover:text-green+400 transition-colors">Facebook})