# BASQUE CHORAL MUSIC - ARQUITECTURA TÉCNICA COMPLETA

## 1. VISIÓN GENERAL DEL PROYECTO

Basque Choral Music es una plataforma de e-commerce cultural especializada en la venta de partituras digitales de compositores vascos. El objetivo es convertirse en la referencia mundial de la música coral vasca, combinando elegancia, funcionalidad y seguridad.

---

## 2. STACK TÉCNICO RECOMENDADO

### Frontend
| Tecnología | Uso | Justificación |
|------------|-----|---------------|
| **React 18+** | Framework UI | Componentes reutilizables, gran ecosistema |
| **TypeScript** | Tipado estático | Seguridad, mantenibilidad, escalabilidad |
| **Vite** | Build tool | Rápido, moderno, optimizado |
| **Tailwind CSS** | Estilos | Utility-first, responsive, personalizable |
| **shadcn/ui** | Componentes UI | Accesibles, modernos, personalizables |
| **Framer Motion** | Animaciones | Fluidas, profesionales, performantes |
| **Zustand** | Estado global | Ligero, simple, efectivo |
| **React Query** | Data fetching | Caché, sincronización, optimista |

### Backend (Recomendación para producción)
| Tecnología | Uso | Justificación |
|------------|-----|---------------|
| **Node.js + Express** | API REST | JavaScript full-stack, rápido desarrollo |
| **PostgreSQL** | Base de datos relacional | Robusta, ACID, escalable |
| **Prisma ORM** | Acceso a datos | Type-safe, migrations, intuitivo |
| **Redis** | Caché y sesiones | Rápido, ideal para tokens temporales |
| **AWS S3 / Cloudflare R2** | Almacenamiento PDFs | Escalable, CDN integrado |
| **Stripe** | Pagos | Seguro, robusto, internacional |
| **PDF-Lib.js** | Manipulación PDF | Client-side, watermark dinámico |
| **JWT** | Autenticación | Stateless, escalable |

---

## 3. ESTRUCTURA DE BASE DE DATOS

### Diagrama Entidad-Relación

```
USERS (1) ----< (N) PURCHASES ----< (N) PURCHASE_ITEMS
  |                    |
  |                    +---- (1) SCORES
  |
  +----< (N) FAVORITES ---- (1) SCORES
  |
  +----< (N) DOWNLOAD_LOGS

COMPOSERS (1) ----< (N) SCORES

SCORES (N) ----< (N) TAGS (via SCORE_TAGS)

CATEGORIES (1) ----< (N) SCORES
```

### Esquema Detallado

#### Tabla: `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  role ENUM('user', 'admin', 'composer') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  preferences JSONB -- { newsletter: boolean, language: string }
);
```

#### Tabla: `composers`
```sql
CREATE TABLE composers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  biography TEXT,
  birth_year INTEGER,
  death_year INTEGER,
  birthplace VARCHAR(200),
  photo_url TEXT,
  website_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `categories`
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0
);
```

#### Tabla: `scores`
```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  composer_id UUID REFERENCES composers(id),
  category_id UUID REFERENCES categories(id),
  year INTEGER,
  choir_type ENUM('SATB', 'SSA', 'TTBB', 'SSAA', 'TTBB', 'SAB', 'SA', 'TB', 'Unison', 'Other') NOT NULL,
  language VARCHAR(50),
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  duration_minutes INTEGER,
  duration_seconds INTEGER,
  price DECIMAL(10,2) NOT NULL,
  is_free BOOLEAN DEFAULT FALSE,
  description TEXT,
  cover_image_url TEXT,
  preview_pages INTEGER DEFAULT 3,
  pdf_url TEXT NOT NULL, -- URL al PDF original (protegido)
  audio_sample_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  seo_title VARCHAR(70),
  seo_description VARCHAR(160),
  meta_keywords TEXT
);
```

#### Tabla: `tags`
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL
);
```

#### Tabla: `score_tags`
```sql
CREATE TABLE score_tags (
  score_id UUID REFERENCES scores(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (score_id, tag_id)
);
```

#### Tabla: `purchases`
```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_id VARCHAR(255), -- ID externo de Stripe
  invoice_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

#### Tabla: `purchase_items`
```sql
CREATE TABLE purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  score_id UUID REFERENCES scores(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);
```

#### Tabla: `download_logs`
```sql
CREATE TABLE download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  score_id UUID REFERENCES scores(id),
  purchase_id UUID REFERENCES purchases(id),
  download_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  downloaded_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);
```

#### Tabla: `favorites`
```sql
CREATE TABLE favorites (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score_id UUID REFERENCES scores(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, score_id)
);
```

---

## 4. SISTEMA DE WATERMARK (MARCA DE AGUA)

### Flujo de Generación de PDF Personalizado

```
┌─────────────────┐
│  Usuario compra │
│    partitura    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pago confirmado│
│   (Stripe)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Backend genera │────▶│  Token único de │
│  token seguro   │     │  descarga (JWT) │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│  Frontend recibe│
│  token y carga  │
│  PDF original   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  PDF-Lib.js     │────▶│  Carga PDF en   │
│  en cliente     │     │  memoria        │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│  Por cada página│
│  agregar:       │
│  - Watermark    │
│  - Datos usuario│
│  - Texto legal  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Guardar nuevo  │
│  PDF y ofrecer  │
│  descarga       │
└─────────────────┘
```

### Implementación del Watermark

```typescript
// services/watermarkService.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface WatermarkData {
  userName: string;
  email: string;
  orderNumber: string;
  purchaseDate: string;
  licenseText: string;
}

export async function addWatermarkToPDF(
  pdfBytes: Uint8Array,
  watermarkData: WatermarkData
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const watermarkText = `LICENSED TO: ${watermarkData.userName}`;
  const licenseText = `Order: ${watermarkData.orderNumber} | ${watermarkData.purchaseDate}`;
  
  for (const page of pages) {
    const { width, height } = page.getSize();
    
    // Watermark diagonal semi-transparente
    page.drawText(watermarkText, {
      x: width / 2 - 150,
      y: height / 2,
      size: 24,
      font: boldFont,
      color: rgb(0.8, 0.8, 0.8),
      rotate: { angle: -45 * (Math.PI / 180) },
      opacity: 0.3,
    });
    
    // Footer con datos de licencia
    page.drawText(licenseText, {
      x: 50,
      y: 30,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Texto legal pequeño
    page.drawText(watermarkData.licenseText, {
      x: 50,
      y: 15,
      size: 6,
      font: font,
      color: rgb(0.6, 0.6, 0.6),
    });
  }
  
  return await pdfDoc.save();
}
```

---

## 5. FLUJO DE COMPRA COMPLETO

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLUJO DE COMPRA                          │
└─────────────────────────────────────────────────────────────────┘

FASE 1: EXPLORACIÓN
───────────────────
[Home] ──▶ [Catálogo] ──▶ [Filtros] ──▶ [Vista Partitura]
   │           │              │               │
   │           │              │               ▼
   │           │              │         ┌─────────────┐
   │           │              │         │   Preview   │
   │           │              │         │   (3 pág)   │
   │           │              │         └─────────────┘
   │           │              │
   ▼           ▼              ▼
[Search]  [Categorías]  [Ordenar]

FASE 2: SELECCIÓN
───────────────────
[Vista Partitura] ──▶ [Añadir al Carrito]
        │                      │
        │                      ▼
        │              ┌─────────────┐
        │              │   Carrito   │
        │              │   (modal)   │
        │              └─────────────┘
        │
        ▼
[Obras Relacionadas]

FASE 3: CHECKOUT
───────────────────
[Carrito] ──▶ [Login/Register] ──▶ [Datos Facturación]
   │                                      │
   │                                      ▼
   │                           ┌─────────────────┐
   │                           │  Stripe Checkout │
   │                           │  (tarjeta/Sepa)  │
   │                           └────────┬────────┘
   │                                    │
   ▼                                    ▼
[Seguir comprando]            [Confirmación Pago]
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Generación PDF │
                              │   + Watermark   │
                              └────────┬────────┘
                                       │
                                       ▼
FASE 4: ENTREGA                        [Descarga]
───────────────────                           │
                                       ┌──────┴──────┐
                                       ▼             ▼
                                [Download]    [Email con]
                                [Inmediato]   [enlace seguro]
                                       │
                                       ▼
                                [Área Usuario]
                                [Historial]
```

---

## 6. ESTRUCTURA SEO

### URLs Amigables
```
/                          → Home
/catalogo                  → Catálogo completo
/catalogo?choir=satb       → Filtro por tipo de coro
/catalogo?difficulty=3     → Filtro por dificultad
/partitura/[slug]          → Detalle de partitura
/compositores              → Listado de compositores
/compositor/[slug]         → Perfil de compositor
/sobre-nosotros            → Información sobre el proyecto
/blog                      → Blog para contenido SEO
/contacto                  → Formulario de contacto
/ayuda                     → FAQ y ayuda
/mi-cuenta                 → Área de usuario
/carrito                   → Carrito de compras
```

### Schema.org Implementado

```json
{
  "@context": "https://schema.org",
  "@type": "MusicComposition",
  "name": "Aurresku",
  "composer": {
    "@type": "Person",
    "name": "Jesús Guridi"
  },
  "datePublished": "1940",
  "genre": "Música Coral Vasca",
  "inLanguage": "eu",
  "offers": {
    "@type": "Offer",
    "price": "15.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

### Keywords Objetivo
- Primarias: "música coral vasca", "partituras coro vasco", "Basque choral music"
- Secundarias: "SATB scores Basque", "partituras SSAA", "compositores vascos"
- Long-tail: "partituras coro infantil euskera", "música sacra vasca partituras"

---

## 7. SEGURIDAD

### Medidas Implementadas

| Amenaza | Mitigación |
|---------|------------|
| **Scraping** | Rate limiting (100 req/min), CAPTCHA en endpoints sensibles |
| **Descargas ilegales** | Tokens JWT de un solo uso, expiran en 24h |
| **Acceso no autorizado** | JWT con firma RS256, refresh tokens rotativos |
| **Bots** | Cloudflare Turnstile, análisis de comportamiento |
| **SQL Injection** | Prisma ORM (queries parametrizadas) |
| **XSS** | Sanitización de inputs, CSP headers |
| **GDPR** | Consentimiento explícito, derecho al olvido, anonimización |

### Headers de Seguridad
```nginx
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; frame-src https://js.stripe.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 8. ESTRATEGIA DE CONTENIDO

### Blog SEO (Publicaciones Iniciales)
1. "Historia de la música coral vasca: desde el siglo XVI hasta hoy"
2. "Los 10 compositores vascos que todo director de coro debe conocer"
3. "Guía completa de tipos de coro: SATB, SSA, TTBB y más"
4. "Cómo interpretar la música tradicional vasca: consejos para coros"
5. "Diferencias entre la música coral vasca y el resto de España"

### Páginas Informativas
- Sobre la música coral vasca (historia, características)
- Guía de compra y descarga
- Preguntas frecuentes
- Términos y condiciones de licencia
- Política de privacidad

---

## 9. ROADMAP DE DESARROLLO

### Fase 1: MVP (Semanas 1-4)
- [x] Diseño UI/UX completo
- [ ] Setup proyecto y arquitectura base
- [ ] Catálogo de partituras (listado, filtros, búsqueda)
- [ ] Vista detalle de partitura con preview
- [ ] Carrito de compras funcional
- [ ] Autenticación básica (registro/login)
- [ ] Checkout con Stripe
- [ ] Generación de PDF con watermark básico
- [ ] Área de usuario (historial, descargas)

### Fase 2: Escalabilidad (Semanas 5-8)
- [ ] Panel de administración completo
- [ ] Sistema de favoritos
- [ ] Obras relacionadas (algoritmo)
- [ ] Blog integrado
- [ ] Multi-idioma (Euskera, Español, English)
- [ ] Optimización SEO avanzada
- [ ] Analytics y estadísticas
- [ ] Sistema de cupones

### Fase 3: Premium (Semanas 9-12)
- [ ] Licencias institucionales
- [ ] Packs de partituras
- [ ] Suscripciones mensuales/anuales
- [ ] API pública para integraciones
- [ ] Aplicación móvil (PWA)
- [ ] Integración con conservatorios
- [ ] Marketplace multi-compositor

---

## 10. CONSIDERACIONES LEGALES

### Licencias de Uso
```
LICENCIA DE USO DE PARTITURA DIGITAL - BASQUE CHORAL MUSIC

1. ALCANCE DE LA LICENCIA
   - Uso exclusivo para el coro/institución compradora
   - No se permite la redistribución
   - No se permite la venta o sublicencia
   - Máximo de copias según unidades compradas

2. DERECHOS DEL COMPRADOR
   - Interpretación pública
   - Grabación para uso interno
   - Modificación de adaptación para su coro

3. RESTRICCIONES
   - No publicación en internet
   - No compartir con otros coros
   - No uso comercial sin autorización

4. PROPIEDAD INTELECTUAL
   - Los derechos de autor pertenecen al compositor
   - Esta licencia no transfiere derechos de autor
```

### GDPR Compliance
- Consentimiento explícito para marketing
- Derecho de acceso a datos personales
- Derecho de rectificación
- Derecho al olvido (eliminación de cuenta)
- Portabilidad de datos
- Registro de actividad de procesamiento

---

## 11. PLAN DE MONETIZACIÓN

### Modelos de Ingreso

| Modelo | Descripción | Precio Referencia |
|--------|-------------|-------------------|
| **Venta unitaria** | PDF con watermark personalizado | €8-25 por partitura |
| **Packs temáticos** | Colecciones (Navidad, Tradicional, etc.) | €30-60 (descuento 20%) |
| **Licencia institucional** | Acceso ilimitado para conservatorios | €200-500/año |
| **Suscripción** | Acceso a catálogo completo | €15-30/mes |
| **Comisiones** | Por venta de compositores externos | 15-30% comisión |

### Estrategia de Precios
- Obras gratuitas para atraer tráfico (freemium)
- Precios competitivos vs. editores tradicionales
- Descuentos por volumen (más de 5 obras)
- Programa de fidelización

---

## 12. ESTRATEGIA DE LANZAMIENTO

### Pre-lanzamiento (2 semanas antes)
- [ ] Landing page con formulario de espera
- [ ] Campaña en redes sociales (Facebook grupos de coros)
- [ ] Contacto con directores de coro vascos
- [ ] Press kit para medios especializados
- [ ] Lista de correo de coros interesados

### Lanzamiento
- [ ] Webinar con compositores destacados
- [ ] Oferta de lanzamiento (50% descuento primera semana)
- [ ] Colaboración con federaciones de coros
- [ ] Artículos en blogs de música

### Post-lanzamiento
- [ ] Programa de afiliados para coros
- [ ] Contenido semanal en blog
- [ ] Newsletter mensual con novedades
- [ ] Presencia en ferias de música

---

## 13. HERRAMIENTAS RECOMENDADAS

### Desarrollo
- **IDE**: VS Code
- **Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Testing**: Vitest + React Testing Library
- **Documentación**: Storybook

### Diseño
- **UI/UX**: Figma
- **Prototipado**: Figma
- **Assets**: Adobe Creative Suite

### Marketing
- **Analytics**: Google Analytics 4 + Plausible
- **Email**: Mailchimp / SendGrid
- **SEO**: Ahrefs / SEMrush
- **Social**: Buffer / Hootsuite

### Operaciones
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **CDN**: Cloudflare
- **Monitoring**: Sentry + LogRocket
- **Support**: Crisp / Intercom

---

## 14. MÉTRICAS CLAVE (KPIs)

| Métrica | Objetivo Q1 | Objetivo Q2 |
|---------|-------------|-------------|
| Usuarios registrados | 500 | 2,000 |
| Conversion rate | 3% | 5% |
| Ticket promedio | €18 | €22 |
| Partituras vendidas | 200 | 800 |
| Tráfico orgánico | 30% | 50% |
| NPS (satisfacción) | >50 | >60 |

---

## 15. CONCLUSIÓN

Basque Choral Music tiene el potencial de convertirse en la plataforma de referencia mundial para la música coral vasca. La combinación de:

- ✅ Diseño elegante y minimalista
- ✅ Funcionalidad robusta y segura
- ✅ Contenido de calidad y exclusivo
- ✅ SEO optimizado desde el día 1
- ✅ Escalabilidad para futuro crecimiento

...garantiza el éxito del proyecto y su posicionamiento como referente cultural.

---

*Documento creado: 2024*
*Última actualización: 2024*
*Versión: 1.0*
