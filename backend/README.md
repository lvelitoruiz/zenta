# Backend Dashboard

Este es el backend para la aplicación de dashboard, construido con NestJS.

## Requisitos Previos

- Node.js (v18 o superior)
- Docker y Docker Compose (solo para almacenamiento con Prisma)
- npm o yarn

## Configuración Inicial

1. Instalar dependencias:
```bash
npm install
```

2. Copiar el archivo de variables de entorno:
```bash
cp .env.example .env
```

## Tipos de Almacenamiento

El backend puede funcionar con dos tipos de almacenamiento, configurables mediante la variable `STORAGE_TYPE` en el archivo `.env`:

### 1. Almacenamiento en Memoria (memory)
```env
STORAGE_TYPE=memory
```
- Los datos se almacenan en memoria
- Se reinician al reiniciar el servidor
- No requiere base de datos
- Ideal para desarrollo y pruebas rápidas

### 2. Almacenamiento con Prisma (PostgreSQL)
```env
STORAGE_TYPE=prisma
```
- Requiere PostgreSQL
- Persistencia de datos
- Requiere Docker o PostgreSQL local
- Recomendado para producción

## Ejecutar la Aplicación

1. Configurar el tipo de almacenamiento en `.env`:
```env
STORAGE_TYPE=memory  # o prisma
```

2. Si usas Prisma:
   - Iniciar Docker:
   ```bash
   docker-compose up -d
   ```
   - Ejecutar migraciones:
   ```bash
   npx prisma migrate dev
   ```
   - Cargar datos iniciales (opcional):
   ```bash
   npm run seed
   ```

3. Iniciar el servidor:
```bash
npm run start:dev
```

La aplicación estará disponible en http://localhost:3001

## Variables de Entorno

```env
PORT=3001              # Puerto del servidor
NODE_ENV=development   # Entorno (development/production)
STORAGE_TYPE=memory    # Tipo de almacenamiento (memory/prisma)
DATABASE_URL          # URL de PostgreSQL (solo necesario si STORAGE_TYPE=prisma)
```

## Documentación API (Swagger)

La documentación de la API está disponible en:
- http://localhost:3001/api

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev    # Inicia el servidor en modo desarrollo

# Producción
npm run start:prod   # Inicia el servidor en modo producción

# Base de datos (solo con STORAGE_TYPE=prisma)
npm run seed         # Carga datos iniciales en la base de datos

# Tests
npm run test        # Ejecuta tests unitarios
npm run test:e2e    # Ejecuta tests end-to-end
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main.ts              # Punto de entrada
│   ├── app.module.ts        # Módulo principal
│   ├── products/           # Módulo de productos
│   ├── metrics/           # Módulo de métricas
│   └── organizations/     # Módulo de organizaciones
├── prisma/                # Configuración PostgreSQL
└── test/                 # Tests
```

## Endpoints Principales

- `GET /products`: Lista de productos
- `GET /metrics/overview`: Resumen de métricas
- `GET /organizations`: Lista de organizaciones

Para ver todos los endpoints disponibles, consulta la documentación Swagger en `/api`.
