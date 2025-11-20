"use client";

import React from 'react';
import pb from '../../../lib/pocketbase';

export default function Navbar() {
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      try {
        // Clear PocketBase auth
        pb.authStore.clear();

        // Clear all auth cookies
        const cookies = [
          'pb_auth',
          'pb_admin_auth',
          'pb_user',
          'pb_auth_type',
          'pb_auth_token',
          'pb_auth_data'
        ];

        // Clear cookies with proper domain and path
        const domain = window.location.hostname;
        cookies.forEach(cookie => {
          document.cookie = `${cookie}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
          document.cookie = `${cookie}=; Max-Age=0; path=/; domain=.${domain}; SameSite=Lax`;
        });

        // Clear storage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to root, which should handle auth redirects
        window.location.href = '/';
      } catch (e) {
        console.error('Error al cerrar sesión', e);
      }
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-gray-100 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold text-white">App</a>
        <div className="flex items-center gap-3">
          <a href="/auth/login" className="hidden sm:inline text-sm text-gray-300 hover:text-white">Login</a>
          <a href="/auth/register" className="hidden sm:inline text-sm text-gray-300 hover:text-white">Registro</a>
          <button onClick={handleLogout} className="inline-flex items-center rounded-md bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1.5 text-white">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  );
}
