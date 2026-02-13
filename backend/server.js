const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// CORS - Permitir solo el dominio del frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Demasiadas peticiones, por favor intenta más tarde'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (uploads)
app.use('/uploads', express.static(process.env.UPLOAD_DIR || './uploads'));

// ============================================
// RUTAS API
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- COMPOSITORES ---
app.get('/api/composers', async (req, res) => {
  try {
    const { featured } = req.query;
    const composers = await prisma.composer.findMany({
      where: featured === 'true' ? { isFeatured: true } : {},
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { scores: true } }
      }
    });
    res.json(composers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/composers/:slug', async (req, res) => {
  try {
    const composer = await prisma.composer.findUnique({
      where: { slug: req.params.slug },
      include: {
        scores: {
          where: { isActive: true },
          orderBy: { title: 'asc' }
        }
      }
    });
    if (!composer) return res.status(404).json({ error: 'Compositor no encontrado' });
    res.json(composer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CATEGORÍAS ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PARTITURAS ---
app.get('/api/scores', async (req, res) => {
  try {
    const { 
      search, 
      composer, 
      category, 
      choirType, 
      difficulty, 
      isFree, 
      isFeatured,
      sortBy = 'newest',
      page = 1,
      limit = 20
    } = req.query;

    const where = { isActive: true };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { metaKeywords: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (composer) where.composerId = composer;
    if (category) where.categoryId = category;
    if (choirType) where.choirType = choirType;
    if (difficulty) where.difficulty = parseInt(difficulty);
    if (isFree === 'true') where.isFree = true;
    if (isFeatured === 'true') where.isFeatured = true;

    const orderBy = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      popular: { downloadCount: 'desc' },
      name: { title: 'asc' }
    }[sortBy] || { createdAt: 'desc' };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [scores, total] = await Promise.all([
      prisma.score.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        include: {
          composer: true,
          category: true,
          tags: { include: { tag: true } }
        }
      }),
      prisma.score.count({ where })
    ]);

    res.json({
      data: scores,
      meta: {
        total,
        page: parseInt(page),
        perPage: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scores/:slug', async (req, res) => {
  try {
    const score = await prisma.score.findUnique({
      where: { slug: req.params.slug },
      include: {
        composer: true,
        category: true,
        tags: { include: { tag: true } }
      }
    });
    
    if (!score) return res.status(404).json({ error: 'Partitura no encontrada' });
    
    // Incrementar contador de vistas
    await prisma.score.update({
      where: { id: score.id },
      data: { viewCount: { increment: 1 } }
    });
    
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- AUTENTICACIÓN (básica) ---
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email ya registrado' });
    
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);
    
    const user = await prisma.user.create({
      data: { email, passwordHash: hashedPassword, firstName, lastName }
    });
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({ token, user: { id: user.id, email, firstName, lastName, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- USUARIO ---
app.get('/api/user/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- COMPRAS (simulado) ---
app.get('/api/user/purchases', authenticate, async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { score: true }
        }
      }
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- FAVORITOS ---
app.get('/api/user/favorites', authenticate, async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { score: { include: { composer: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(favorites.map(f => f.score));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/favorites/:scoreId', authenticate, async (req, res) => {
  try {
    await prisma.favorite.create({
      data: { userId: req.user.id, scoreId: req.params.scoreId }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user/favorites/:scoreId', authenticate, async (req, res) => {
  try {
    await prisma.favorite.delete({
      where: { userId_scoreId: { userId: req.user.id, scoreId: req.params.scoreId } }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// MANEJO DE ERRORES
// ============================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en puerto ${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/api/health`);
});

// Cerrar Prisma al terminar
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
