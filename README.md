# StageUnify - Sistema de Gestión de Eventos

StageUnify es un sistema de gestión de eventos para la industria del entretenimiento, desarrollado con Next.js, Prisma y Supabase.

## Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn
- Cuenta en Supabase

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd stageunify
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
DATABASE_URL=tu_url_de_conexion_a_postgres
DIRECT_URL=tu_url_directa_de_conexion_a_postgres
```

4. Inicializar la base de datos:
```bash
npx prisma db push
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

- `/src/app`: Páginas y rutas de la aplicación
- `/src/components`: Componentes reutilizables
- `/src/lib`: Utilidades y configuraciones
- `/prisma`: Esquema de la base de datos

## Tecnologías Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- React Hook Form
- Zod

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 