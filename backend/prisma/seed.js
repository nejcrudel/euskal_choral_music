const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear compositores
  const composers = await Promise.all([
    prisma.composer.upsert({
      where: { slug: 'jesus-guridi' },
      update: {},
      create: {
        name: 'Jesús Guridi',
        slug: 'jesus-guridi',
        biography: 'Jesús Guridi (1886-1961) fue uno de los compositores vascos más importantes del siglo XX. Su obra coral es considerada fundamental en el repertorio vasco.',
        birthYear: 1886,
        deathYear: 1961,
        birthplace: 'Vitoria-Gasteiz',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        isFeatured: true,
      },
    }),
    prisma.composer.upsert({
      where: { slug: 'jose-maria-usandizaga' },
      update: {},
      create: {
        name: 'José María Usandizaga',
        slug: 'jose-maria-usandizaga',
        biography: 'José María Usandizaga (1887-1915) fue un compositor donostiarra que, aunque falleció joven, dejó una importante obra coral de raíz vasca.',
        birthYear: 1887,
        deathYear: 1915,
        birthplace: 'Donostia-San Sebastián',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        isFeatured: true,
      },
    }),
    prisma.composer.upsert({
      where: { slug: 'javier-busto' },
      update: {},
      create: {
        name: 'Javier Busto',
        slug: 'javier-busto',
        biography: 'Javier Busto (1949) es uno de los compositores corales vascos más reconocidos internacionalmente en la actualidad.',
        birthYear: 1949,
        birthplace: 'Hondarribia',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        isFeatured: true,
      },
    }),
    prisma.composer.upsert({
      where: { slug: 'francisco-escudero' },
      update: {},
      create: {
        name: 'Francisco Escudero',
        slug: 'francisco-escudero',
        biography: 'Francisco Escudero (1912-2002) fue un compositor guipuzcoano que exploró la música coral con gran profundidad y maestría.',
        birthYear: 1912,
        deathYear: 2002,
        birthplace: 'Zarautz',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        isFeatured: true,
      },
    }),
  ]);

  console.log(`✅ Creados ${composers.length} compositores`);

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'musica-sacra' },
      update: {},
      create: {
        name: 'Música Sacra',
        slug: 'musica-sacra',
        description: 'Obras religiosas y espirituales de la tradición vasca',
        icon: 'church',
        displayOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'musica-tradicional' },
      update: {},
      create: {
        name: 'Música Tradicional',
        slug: 'musica-tradicional',
        description: 'Arranjos de melodías populares vascas',
        icon: 'music',
        displayOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'musica-contemporanea' },
      update: {},
      create: {
        name: 'Música Contemporánea',
        slug: 'musica-contemporanea',
        description: 'Obras de compositores actuales',
        icon: 'mic',
        displayOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'navidad' },
      update: {},
      create: {
        name: 'Navidad',
        slug: 'navidad',
        description: 'Canciones navideñas vascas',
        icon: 'snowflake',
        displayOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'himnos' },
      update: {},
      create: {
        name: 'Himnos y Patrióticas',
        slug: 'himnos',
        description: 'Canciones de identidad vasca',
        icon: 'flag',
        displayOrder: 5,
      },
    }),
  ]);

  console.log(`✅ Creadas ${categories.length} categorías`);

  // Crear tags
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: 'euskera' }, update: {}, create: { name: 'Euskera', slug: 'euskera' } }),
    prisma.tag.upsert({ where: { slug: 'castellano' }, update: {}, create: { name: 'Castellano', slug: 'castellano' } }),
    prisma.tag.upsert({ where: { slug: 'latin' }, update: {}, create: { name: 'Latín', slug: 'latin' } }),
    prisma.tag.upsert({ where: { slug: 'a-cappella' }, update: {}, create: { name: 'A cappella', slug: 'a-cappella' } }),
    prisma.tag.upsert({ where: { slug: 'facil' }, update: {}, create: { name: 'Fácil', slug: 'facil' } }),
    prisma.tag.upsert({ where: { slug: 'medio' }, update: {}, create: { name: 'Medio', slug: 'medio' } }),
    prisma.tag.upsert({ where: { slug: 'dificil' }, update: {}, create: { name: 'Difícil', slug: 'dificil' } }),
  ]);

  console.log(`✅ Creados ${tags.length} tags`);

  // Crear partituras
  const guridi = composers.find(c => c.slug === 'jesus-guridi');
  const usandizaga = composers.find(c => c.slug === 'jose-maria-usandizaga');
  const busto = composers.find(c => c.slug === 'javier-busto');
  const escudero = composers.find(c => c.slug === 'francisco-escudero');
  
  const tradicional = categories.find(c => c.slug === 'musica-tradicional');
  const sacra = categories.find(c => c.slug === 'musica-sacra');
  const navidad = categories.find(c => c.slug === 'navidad');
  const himnos = categories.find(c => c.slug === 'himnos');

  const scores = await Promise.all([
    prisma.score.upsert({
      where: { slug: 'aurresku-guridi' },
      update: {},
      create: {
        title: 'Aurresku',
        slug: 'aurresku-guridi',
        composerId: guridi.id,
        categoryId: tradicional.id,
        year: 1940,
        choirType: 'SATB',
        language: 'Euskera',
        difficulty: 3,
        durationMinutes: 4,
        durationSeconds: 30,
        price: 18.00,
        isFree: false,
        description: 'El Aurresku es una de las obras corales más conocidas de Jesús Guridi. Basada en la tradicional danza vasca, esta pieza captura la esencia de la cultura vasca con una armonía rica y expresiva.',
        coverImageUrl: 'https://images.unsplash.com/photo-1514117445516-2ec90fa4d84c?w=600&h=800&fit=crop',
        previewPages: 3,
        isActive: true,
        isFeatured: true,
        downloadCount: 245,
        viewCount: 1890,
        seoTitle: 'Aurresku - Jesús Guridi | Partitura SATB',
        seoDescription: 'Partitura coral del Aurresku de Jesús Guridi. Obra maestra de la música vasca para coro SATB.',
      },
    }),
    prisma.score.upsert({
      where: { slug: 'asi-cantan-los-chicos' },
      update: {},
      create: {
        title: 'Así Cantan los Chicos',
        slug: 'asi-cantan-los-chicos',
        composerId: usandizaga.id,
        categoryId: tradicional.id,
        year: 1910,
        choirType: 'SSA',
        language: 'Euskera',
        difficulty: 2,
        durationMinutes: 3,
        durationSeconds: 15,
        price: 12.00,
        isFree: false,
        description: 'Colección de canciones infantiles en euskera, perfectas para coros juveniles y escolares.',
        coverImageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=800&fit=crop',
        previewPages: 3,
        isActive: true,
        isFeatured: false,
        downloadCount: 178,
        viewCount: 920,
      },
    }),
    prisma.score.upsert({
      where: { slug: 'gabon-zegoen' },
      update: {},
      create: {
        title: 'Gabon Zegoen',
        slug: 'gabon-zegoen',
        composerId: escudero.id,
        categoryId: navidad.id,
        year: 1965,
        choirType: 'SATB',
        language: 'Euskera',
        difficulty: 3,
        durationMinutes: 5,
        durationSeconds: 0,
        price: 15.00,
        isFree: false,
        description: 'Preciosa villancico en euskera que narra el nacimiento de Jesús.',
        coverImageUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=800&fit=crop',
        previewPages: 3,
        isActive: true,
        isFeatured: true,
        downloadCount: 312,
        viewCount: 1456,
      },
    }),
    prisma.score.upsert({
      where: { slug: 'txalopin-txalo' },
      update: {},
      create: {
        title: 'Txalopin Txalo',
        slug: 'txalopin-txalo',
        composerId: busto.id,
        categoryId: tradicional.id,
        year: 1990,
        choirType: 'SSA',
        language: 'Euskera',
        difficulty: 1,
        durationMinutes: 2,
        durationSeconds: 30,
        price: 0,
        isFree: true,
        description: 'Canción tradicional vasca adaptada para coro femenino. ¡Descarga gratuita!',
        coverImageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=800&fit=crop',
        previewPages: 3,
        isActive: true,
        isFeatured: true,
        downloadCount: 567,
        viewCount: 2345,
      },
    }),
    prisma.score.upsert({
      where: { slug: 'agur-jaunak' },
      update: {},
      create: {
        title: 'Agur Jaunak',
        slug: 'agur-jaunak',
        composerId: guridi.id,
        categoryId: himnos.id,
        year: 1938,
        choirType: 'SATB',
        language: 'Euskera',
        difficulty: 2,
        durationMinutes: 3,
        durationSeconds: 30,
        price: 10.00,
        isFree: false,
        description: 'El saludo vasco por excelencia. Esta versión coral de Guridi es la más conocida.',
        coverImageUrl: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?w=600&h=800&fit=crop',
        previewPages: 3,
        isActive: true,
        isFeatured: true,
        downloadCount: 456,
        viewCount: 2134,
      },
    }),
  ]);

  console.log(`✅ Creadas ${scores.length} partituras`);

  // Crear usuario admin de prueba
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@euskalchoral.eus' },
    update: {},
    create: {
      email: 'admin@euskalchoral.eus',
      passwordHash: hashedPassword,
      firstName: 'Administrador',
      lastName: 'Sistema',
      isEmailVerified: true,
      isActive: true,
      role: 'admin',
    },
  });

  console.log('✅ Usuario admin creado: admin@euskalchoral.eus / admin123');

  console.log('\n🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
