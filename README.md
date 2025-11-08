# Hackaton YWT - React Mobile First con Firebase

Proyecto React con diseño mobile-first que incluye autenticación con Firebase (Login y Registro).

## 🚀 Características

- ✅ Diseño mobile-first responsive
- ✅ Autenticación con Firebase (Email/Password)
- ✅ Páginas de Login y Registro
- ✅ Protección de rutas
- ✅ Interfaz moderna y atractiva
- ✅ TypeScript para type safety

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Firebase

## 🔧 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura Firebase:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o usa uno existente
   - Habilita Authentication > Sign-in method > Email/Password
   - Copia las credenciales de tu proyecto

3. Configura las credenciales de Firebase usando variables de entorno:
   - Copia el archivo `.env.example` a `.env` (o créalo manualmente)
   - Abre el archivo `.env` y reemplaza los valores con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
```

   **⚠️ IMPORTANTE:** El archivo `.env` NO se sube a GitHub (ya está en `.gitignore`). Solo el archivo `.env.example` se sube como plantilla.

## 🏃 Ejecutar el proyecto

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 📱 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.tsx          # Componente de Login
│   ├── Register.tsx       # Componente de Registro
│   ├── Home.tsx           # Página principal (protegida)
│   ├── Auth.css           # Estilos para autenticación
│   └── Home.css           # Estilos para Home
├── firebase/
│   └── config.ts          # Configuración de Firebase
├── App.tsx                 # Componente principal con routing
├── App.css                 # Estilos globales
└── main.tsx                # Punto de entrada
```

## 🎨 Diseño Mobile First

El proyecto está diseñado con un enfoque mobile-first:
- Estilos optimizados para móviles primero
- Breakpoints para tablet (768px) y desktop (1024px)
- Interfaz táctil-friendly
- Inputs con tamaño de fuente adecuado para evitar zoom en iOS

## 🔐 Rutas

- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/` - Página principal (requiere autenticación)

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la build de producción

## 📝 Notas

- Asegúrate de tener habilitado Email/Password en Firebase Authentication
- Las rutas están protegidas automáticamente
- Los usuarios no autenticados son redirigidos a `/login`
- Los usuarios autenticados no pueden acceder a `/login` o `/register`
- **Seguridad:** Las credenciales de Firebase se manejan mediante variables de entorno (`.env`), que NO se suben a GitHub

