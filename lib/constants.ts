"use client";

import { useState } from 'react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de mascotas",
      content: "Los productos son de excelente calidad y mis mascotas los adoran. El servicio al cliente es excepcional.",
      image: "https://images.unsplash.com/photo-1739300293388-c28c70ae80e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Veterinario",
      content: "Recomiendo Amazona Home a todos mis clientes. Sus productos son seguros y de alta calidad para las mascotas.",
      image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Criadora profesional",
      content: "He comprado aquí por años y nunca me han decepcionado. Los envíos son rápidos y los precios competitivos.",
      image: "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Roberto Silva",
      role: "Entrenador canino",
      content: "Los juguetes y accesorios de Amazona Home son duraderos y perfectos para el entrenamiento.",
      image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Fernández",
      role: "Rescatista",
      content: "Amazona Home siempre nos apoya con donaciones para nuestro refugio. Son una empresa con gran corazón.",
      image: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "David López",
      role: "Dueño de gatos",
      content: "La variedad de productos para gatos es impresionante. Mis felinos están felices con sus nuevos juguetes.",
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
      alt: "Juguetes interactivos"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Accesorios para mascotas"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Camas y descanso"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
      alt: "Productos para gatos"
    }
  ];

  const categories = [
    { name: "Perros", href: "#" },
    { name: "Gatos", href: "#" },
    { name: "Aves", href: "#" },
    { name: "Peces", href: "#" },
    { name: "Roedores", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Amazona Home
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-800">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section className="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Todo para tu 
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"> mascota</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
              Descubre los mejores productos y accesorios para el bienestar de tu compañero animal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                Ver Productos
              </button>
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600 max-w -2xl mx-auto">
              Miles de dueños de mascotas confían en nosotros para el cuidado y felicidad de sus compañeros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols -2 lg:grid-cols -3 gap+ -6 lg-gap+ -8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p+ -6 hover-shadow-xl transition-shadow duration+ -300">
                <div className="flex items-center mb+ -4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w+ -12 h+ -12 rounded-full object+ -cover mr+ -4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray+ -900">{testimonial.name}</h4>
                    <p className="text-green+ -600 text+ -sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray+ -600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py+ -16 bg+ -white">
        <div className="max-w+ -7xl mx-auto px+ -4 sm-px+ -6 lg-px+ -8">
          <div className="text-center mb+ -12">
            <h2 className="text+ -3xl md-text+ -4xl font-bold text-gray+ -900 mb+ -4">
              Nuestra Galería
            </h2>
            <p className="text-lg text-gray+ -600 max-w+ -2xl mx-auto">
              Descubre la calidad y variedad de nuestros productos para mascotas
            </p>
          </div>

          <div className="grid grid-cols+ -1 sm-grid-cols+ -2 lg-grid-cols+ -3 gap+ -6">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg hover-shadow-xl transition-all duration+ -300 transform hover-scale+ -105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h+ -64 object+ -cover group-hover-scale+ -110 transition-transform duration+ -500"
                />
                <div className="absolute inset+ -0 bg-gradient-to-t from-black via-transparent to-transparent opacity+ -0 group-hover-opacity+ -100 transition-opacity duration+ -300 flex items-end p+ -4">
                  <span className="text-white font-medium">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py+ -12">
        <div className="max-w+ -7xl mx-auto px+ -4 sm-px+ -6 lg-px+ -8">
          <div className="grid grid-cols+ -1 md-grid-cols+ -4 gap+ -8">
            <div className="col-span+ -1 md-col-span+ -2">
              <h3 className="text+ -2xl font-bold bg-gradient-to-r from-green+ -400 to-green+ -600 bg-clip-text text-transparent mb+ -4">
                Amazona Home
              </h3>
              <p className="text-gray+ -400 mb+ -6 max-w-md">
                Tu tienda de confianza para todo lo que tu mascota necesita. Calidad, servicio y amor por los animales.
              </p>
              <div className="flex space-x+ -4">
                <a href="#" className="text-gray+ -400 hover-text-green+ -400 transition-colors duration+ -200">
                  Facebook
                </a>
                <a href="#" className="text-gray+ -400 hover-text-green+ -400 transition-colors duration+ -200">
                  Instagram
                </a>
                <a href="#" className="text-gray+ -400 hover-text-green+ -400 transition-colors duration+ -200">
                  Twitter
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb+ -4">Categorías</h4>
              <ul className="space-y+ -2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href} className="text-gray+ -400 hover-text-green+ -400 transition-colors duration+ -200}})))