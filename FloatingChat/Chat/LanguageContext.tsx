"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: any;
}

const translations: Record<Language, Translations> = {
  en: {
    auth: {
      welcome: 'Welcome',
      signInDescription: 'Sign in to continue',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      createAccount: 'Create Account',
      creatingAccount: 'Creating account...',
      loginFailed: 'Login failed',
      registrationFailed: 'Registration failed',
      passwordsDontMatch: 'Passwords do not match',
      termsText: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    },
    chat: {
      typeMessage: 'Type a message...',
      send: 'Send',
      logout: 'Logout',
      settings: 'Settings',
      connectedUsers: 'Connected Users',
    },
  },
  es: {
    auth: {
      welcome: 'Bienvenido',
      signInDescription: 'Inicia sesión para continuar',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      enterEmail: 'Ingresa tu correo',
      enterPassword: 'Ingresa tu contraseña',
      signIn: 'Iniciar sesión',
      signingIn: 'Iniciando sesión...',
      createAccount: 'Crear cuenta',
      creatingAccount: 'Creando cuenta...',
      loginFailed: 'Error al iniciar sesión',
      registrationFailed: 'Error al registrarse',
      passwordsDontMatch: 'Las contraseñas no coinciden',
      termsText: 'Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad',
    },
    chat: {
      typeMessage: 'Escribe un mensaje...',
      send: 'Enviar',
      logout: 'Cerrar sesión',
      settings: 'Configuración',
      connectedUsers: 'Usuarios conectados',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
