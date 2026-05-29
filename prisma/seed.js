const { PrismaClient } = require('@prisma/client');
const { PRODUCTS, CATEGORIES } = require('../lib/mockData');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Seed categories
  for (const cat of CATEGORIES) {
    await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        productCount: cat.productCount,
      },
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories`);

  // Seed products
  for (const product of PRODUCTS) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory,
        featured: product.featured,
        bestseller: product.bestseller,
        newArrival: product.newArrival,
        stock: product.stock,
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
