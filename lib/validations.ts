"use client";

import { useState } from 'react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de mascotas",
      content: "Los productos de Amazona Home son de excelente calidad. Mi perro adora su nueva cama y los juguetes son muy resistentes.",
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
      content: "La variedad de productos es impresionante. Desde alimento hasta accesorios, todo lo encuentro aquí.",
      image: "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David López",
      role: "Dueño de gatos",
      content: "El servicio al cliente es excepcional y los envíos siempre llegan a tiempo. Mis gatos están felices.",
      image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Sánchez",
      role: "Rescatista",
      content: "Los precios son muy competitivos y la calidad supera mis expectativas. Perfecto para mis animales rescatados.",
      image: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Roberto Torres",
      role: "Dueño de perros",
      content: "La comida premium que venden ha mejorado notablemente la salud y el pelaje de mis perros.",
      image: "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1739300293388-c28c70ae80e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
    "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
    "https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
    "https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
    "https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop",
    "https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Amazona Home
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#inicio" className="hover:text-green-400 transition-colors">Inicio</a>
              <a href="#productos" className="hover:text-green-400 transition-colors">Productos</a>
              <a href="#testimonios" className="hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#galeria" className="hover:text-green-400 transition-colors">Galería</a>
              <a href="#contacto" className="hover:text-green-400 transition-colors">Contacto</a>
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
              <a href="#testimonios" className="block hover:text-green-400 transition-colors">Testimonios</a>
              <a href="#galeria" className="block hover:text-green-400 transition-colors">Galería</a>
              <a href="#contacto" className="block hover:text-green-400 transition-colors">Contacto</a>
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bienvenido a <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Amazona Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Todo lo que tu mascota necesita en un solo lugar. Productos de calidad premium para el bienestar de tus compañeros animales.
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

      <section id="testimonios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Lo Que Dicen Nuestros Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
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

      <section id="galeria" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nuestra Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols -2 lg:grid-cols -3 gap -6">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={image} 
                  alt={`Galería ${index + 1}`}
                  className="w-full h -64 object -cover hover:scale -105 transition-transform duration -300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-black text-white py -12">
        <div className="container mx-auto px -6">
          <div className="grid grid-cols -1 md:grid-cols -4 gap -8">
            <div>
              <h3 className="text -2xl font -bold mb -4 bg-gradient-to-r from-green -400 to-green -600 bg-clip-text text-transparent">
                Amazona Home
              </h3>
              <p className="text-gray -400">
                Tu tienda de confianza para productos premium para mascotas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb -4">Enlaces Rápidos</h4>
              <ul className="space-y -2">
                <li><a href="#inicio" className="text-gray -400 hover:text-green -400 transition-colors">Inicio</a></li>
                <li><a href="#productos" className="text-gray -400 hover:text-green -400 transition-colors">Productos</a></li>
                <li><a href="#testimonios" className="text-gray -400 hover:text-green -400 transition-colors">Testimonios</a></li>
                <li><a href="#galeria" className="text-gray -400 hover:text-green -400 transition-colors">Galería</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb -4">Contacto</h4>
              <ul className="space-y -2 text-gray -400">
                <li>Email: info@amazonahome.com</li>
                <li>Teléfono: +1 234 567 890</li>
                <li>Dirección: Calle Mascotas 123</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb -4">Síguenos</h4>
              <div className="flex space-x -4">
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Facebook</a>
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Instagram</a>
                <a href="#" className="text-gray -400 hover:text-green -400 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray -800 mt -8 pt -8 text-center text-gray -400">
            <p>&copy; 2024 Amazona Home. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}