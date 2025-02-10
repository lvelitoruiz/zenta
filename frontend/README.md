# Frontend Dashboard

Este es el frontend para la aplicación de dashboard, construido con Next.js 14 y TypeScript.

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Backend corriendo en localhost:3001

## Configuración Inicial

1. Instalar dependencias:
```bash
npm install
```

2. Copiar el archivo de variables de entorno:
```bash
cp .env.example .env.local
```

3. Configurar las variables de entorno:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## Scripts Disponibles

```bash
# Desarrollo
npm run dev       # Inicia el servidor de desarrollo

# Producción
npm run build    # Construye la aplicación
npm run start    # Inicia el servidor de producción

# Linting y Formato
npm run lint     # Ejecuta el linter
```

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/              # Páginas y layouts
│   │   ├── Charts/      # Gráficos
│   │   ├── Dashboard/   # Componentes del dashboard
│   │   ├── Layout/      # Componentes de layout
│   │   ├── Metrics/     # Componentes de métricas
│   │   ├── Table/       # Componentes de tabla
│   │   └── ui/          # Componentes UI reutilizables
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilidades y configuraciones
│   ├── store/           # Estado global (Redux)
│   └── types/           # Tipos TypeScript
├── public/              # Archivos estáticos
└── tailwind.config.js   # Configuración de Tailwind CSS
```

## Tecnologías Principales

- Next.js 14
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Chart.js
- FontAwesome

## Características

- Dashboard interactivo
- Gráficos y métricas en tiempo real
- Tabla de productos con ordenamiento y filtros
- Diseño responsive
- Manejo de estados de carga y error
- Temas oscuros
- Selección de organización

## Desarrollo

- Los componentes están organizados por funcionalidad
- Se utiliza el patrón de diseño atómico
- Implementación de error boundaries
- Custom hooks para lógica reutilizable
- Estado global con Redux Toolkit
- Estilos con Tailwind CSS

## Notas

- Asegúrate de que el backend esté corriendo antes de iniciar el frontend
- La aplicación requiere una conexión activa al backend para funcionar
- Los cambios en el código se reflejan automáticamente en el navegador
