# PB_Datos

Esta carpeta contiene una aplicación de base de datos conectada a PocketBase.

## Estructura
- `app/`: Aplicación Next.js para la gestión de la base de datos
- `pocket-base/`: Instalación y migraciones de PocketBase
- `components/`, `context/`, `hooks/`, `lib/`: Componentes y utilidades compartidos
- `types/`: Definiciones de tipos TypeScript

## Instrucciones de uso

1. Navega a la carpeta `pocket-base/`
2. Ejecuta el instalador apropiado para tu sistema:
   - Windows: `install-pocketbase.ps1`
   - macOS/Linux: `install-pocketbase.sh`
3. Una vez que PocketBase esté corriendo, navega a la raíz de PB_Datos
4. Ejecuta `npm install` para instalar las dependencias
5. Ejecuta `npm run dev` para iniciar la aplicación Next.js
