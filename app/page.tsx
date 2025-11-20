'use client';

import { useState } from 'react';
import Icon from '@/components/common/Icon';

const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de mascotas",
      content: "Excelente calidad en los productos para mi perro. El servicio al cliente es excepcional.",
      image: "https://images.unsplash.com/photo-1605712161712-a0623699205e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Veterinario",
      content: "Recomiendo Amazona Home a todos mis clientes. Productos de primera calidad.",
      image: "https://images.unsplash.com/photo-1677691824257-5772713ac90a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Criadora profesional",
      content: "Los mejores precios y la entrega más rápida que he experimentado.",
      image: "https://images.unsplash.com/photo-1707927438677-592d30e1262a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David López",
      role: "Dueño de gato",
      content: "Mi gato adora los juguetes que compré aquí. Muy buena relación calidad-precio.",
      image: "https://images.unsplash.com/photo-1738743217075-aab7af694f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Laura Sánchez",
      role: "Rescatista",
      content: "Productos seguros y de calidad para todos los animales que rescatamos.",
      image: "https://images.unsplash.com/photo-1758874572608-cadad26f0352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Roberto Jiménez",
      role: "Entrenador canino",
      content: "Material profesional para entrenamiento. Mis clientes están encantados.",
      image: "https://images.unsplash.com/photo-1758876203819-4cb3eec8e1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTkyODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjE3NjIxMDh8&ixlib=rb-4.1.0&q=80&w=1080&w=450&h=300&fit=crop"
    }
];

const features = [
    {
      icon: "shield",
      title: "Calidad Garantizada",
      description: "Todos nuestros productos pasan rigurosos controles de calidad"
    },
    {
      icon: "truck",
      title: "Envío Rápido",
      description: "Recibe tus pedidos en 24-48 horas en toda la ciudad"
    },
    {
      icon: "creditCard",
      title: "Pago Seguro",
      description: "Múltiples métodos de pago con total seguridad"
    },
    {
      icon: "award",
      title: "Premiados",
      description: "Reconocidos como la mejor tienda de mascotas 2024"
    }
];

const categories = [
    { name: "Alimentos", icon: "beef" },
    { name: "Juguetes", icon: "gift" },
    { name: "Accesorios", icon: "shirt" },
    { name: "Salud", icon: "heart" },
    { name: "Higiene", icon: "sparkles" },
    { name: "Transporte", icon: "car" }
];

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="paw" className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold">Amazona Home</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-green-400 transition-colors">Inicio</a>
              <a href="#" className="hover:text-green-400 transition-colors">Productos</a>
              <a href="#" className="hover:text-green-400 transition-colors">Categorías</a>
              <a href="#" className="hover:text-green-400 transition-colors">Nosotros</a>
              <a href="#" className="hover:text-green-400 transition-colors">Contacto</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hover:text-green-400 transition-colors">
                <Icon name="search" className="w-6 h-6" />
              </button>
              <button className="hover:text-green-400 transition-colors">
                <Icon name="shoppingCart" className="w-6 h-6" />
              </button>
              <button 
                className="md:hidden hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name="menu" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="hover:text-green-400 transition-colors">Inicio</a>
                <a href="#" className="hover:text-green-400 transition-colors">Productos</a>
                <a href="#" className="hover:text-green-400 transition-colors">Categorías</a>
                <a href="#" className="hover:text-green-400 transition-colors">Nosotros</a>
                <a href="#" className="hover:text-green-400 transition-colors">Contacto</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Todo para tu
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> mejor amigo</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Descubre la mejor selección de productos para mascotas con calidad premium y servicio excepcional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
              <Icon name="shoppingBag" className="w-5 h-5" />
              <span>Comprar Ahora</span>
            </button>
            <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Ver Productos
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Categorías Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="bg-gradient-to-br from-black to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={category.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Por Qué Elegirnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-black to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={feature.icon} className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p -6 shadow-lg">
                <div className="flex items-center mb -4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py -16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestra Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div key={testimonial.id} className="relative group overflow-hidden rounded-xl">
                <img 
                  src={testimonial.image} 
                  alt={`Galería ${testimonial.id}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon name="zoomIn" className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-black to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Consentir a tu Mascota?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de dueños felices que confían en Amazona Home para el bienestar de sus mascotas
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Comenzar a Comprar
          </button>
        </div>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="paw" className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold">Amazona Home</span>
              </div>
              <p className="text-gray-400">
                Tu tienda de confianza para productos premium para mascotas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Productos</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Categorías</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Envío Express</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Asesoramiento</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Garantía</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Soporte 24/7</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Icon name="phone" className="w-4 h-4" />
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="mail" className="w-4 h-4" />
                  <span>info@amazonahome.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="mapPin" className="w-4 h-4" />
                  <span>Ciudad, País</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Amazona Home. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}