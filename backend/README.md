# 🎵 Euskal Choral Music - Backend API

Backend API para la plataforma de partituras corales vascas.

## 📋 Requisitos

- Node.js 18+
- MariaDB 10.6+ (o MySQL 8.0+)
- npm o yarn

## 🚀 Instalación

### 1. Clonar y entrar al directorio

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Configurar base de datos en Plesk

1. Ve a **Bases de datos** en Plesk
2. Clic en **Añadir base de datos**
3. Configura:
   - **Nombre de la BD**: `basque_choral_music`
   - **Usuario**: `bcm_user`
   - **Contraseña**: (genera una segura)
4. Actualiza `DATABASE_URL` en tu archivo `.env`

### 5. Generar cliente Prisma y migrar

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Poblar base de datos con datos de ejemplo

```bash
npm run db:seed
```

### 7. Iniciar servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📁 Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma    # Definición de la base de datos
│   └── seed.js          # Datos de ejemplo
├── uploads/             # Archivos subidos (PDFs, imágenes)
├── .env                 # Variables de entorno (no subir a git)
├── .env.example         # Plantilla de variables
├── package.json         # Dependencias
├── README.md            # Este archivo
└── server.js            # Servidor principal
```

## 🔌 API Endpoints

### Compositores
- `GET /api/composers` - Listar compositores
- `GET /api/composers?featured=true` - Compositores destacados
- `GET /api/composers/:slug` - Detalle de compositor

### Categorías
- `GET /api/categories` - Listar categorías

### Partituras
- `GET /api/scores` - Listar partituras
  - Query params: `search`, `composer`, `category`, `choirType`, `difficulty`, `isFree`, `isFeatured`, `sortBy`, `page`, `limit`
- `GET /api/scores/:slug` - Detalle de partitura

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuario (requiere autenticación)
- `GET /api/user/me` - Perfil del usuario
- `GET /api/user/purchases` - Historial de compras
- `GET /api/user/favorites` - Favoritos
- `POST /api/user/favorites/:scoreId` - Añadir favorito
- `DELETE /api/user/favorites/:scoreId` - Eliminar favorito

## ⚙️ Configuración en Plesk

### 1. Node.js en Plesk

1. Ve a **Sitios web y dominios** → Tu dominio → **Configuración de Node.js**
2. Configura:
   - **Document root**: `backend`
   - **Aplicación URL**: `https://tudominio.com/api`
   - **Variable de entorno**: Añade las del archivo `.env`

### 2. Proxy inverso (Apache/Nginx)

Si usas Apache, añade al `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
```

### 3. PM2 (recomendado)

```bash
npm install -g pm2
pm2 start server.js --name "euskal-api"
pm2 save
pm2 startup
```

## 🔐 Seguridad

- Todas las contraseñas se hashean con bcrypt
- JWT para autenticación
- Rate limiting en todas las rutas API
- Helmet para headers de seguridad
- CORS configurado

## 📝 Licencia

Proyecto privado - Basque Choral Music
