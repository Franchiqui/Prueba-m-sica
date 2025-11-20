"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */


import * as React from 'react';
import { Button } from '../components/ui/button';
import { LogOut } from 'lucide-react';
import pb from '../../lib/pocketbase';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();

  const openSettingsModal = () => {
    window.dispatchEvent(new CustomEvent('openSettingsModal'));
  };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      try {
        // 1. Cerrar sesión en la API de PocketBase (puerto 3002)
        try {
          await pb.collection('users').authRefresh();
          await pb.collection('users').authWithOAuth2({ provider: 'logout' });
        } catch (e) {
          console.log('Sesión ya cerrada en el servidor');
        }
        
        // 2. Limpiar el store de autenticación local
        pb.authStore.clear();
        
        // 3. Limpiar cookies de autenticación
        const cookies = [
          'pb_auth',
          'pb_admin_auth',
          'pb_user',
          'pb_auth_type',
          'pb_auth_token',
          'pb_auth_data',
          'pb_csrf_token'
        ];
        
        // 4. Limpiar cookies para ambos puertos
        const domains = [
          window.location.hostname,
          'localhost:3000',
          'localhost:3002'
        ];
        
        cookies.forEach(cookie => {
          // Limpiar para todas las rutas y dominios relevantes
          domains.forEach(domain => {
            document.cookie = `${cookie}=; Max-Age=0; path=/;`;
            if (!domain.startsWith('localhost')) {
              document.cookie = `${cookie}=; Max-Age=0; path=/; domain=${domain}`;
              document.cookie = `${cookie}=; Max-Age=0; path=/; domain=.${domain}`;
            }
          });
        });
        
        // 5. Limpiar almacenamiento local
        localStorage.clear();
        sessionStorage.clear();
        
        // 6. Redirigir a la página de inicio de la aplicación (puerto 3000)
        window.location.href = 'http://localhost:3000/';
      } catch (e) {
        console.error('Error al cerrar sesión', e);
      }
    }
  };

  return (
    <nav id="main-navbar" className="w-full bg-gray-800 text-gray-100 border-b border-gray-700">
      <div className="container flex h-14 items-center">

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="flex items-center space-x-2">
              <a href="/" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Dashboard
              </a>
              <a href="/database" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Database
              </a>
              <button onClick={openSettingsModal} className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Settings
              </button>
            </nav>
          </div>
          <nav className="flex items-center space-x-2">
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-400 hover:bg-red-600 hover:text-white transition-colors duration-200"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}