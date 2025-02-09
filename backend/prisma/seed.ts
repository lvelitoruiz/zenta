import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

const randomPrice = (min: number, max: number): number => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const randomStock = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const categories = [
  'Laptop',
  'Smartphone',
  'Tablet',
  'Monitor',
  'Teclado',
  'Mouse',
  'Audífonos',
  'Cámara',
  'Impresora',
  'Router',
];
const brands = [
  'Samsung',
  'Apple',
  'Dell',
  'HP',
  'Lenovo',
  'Asus',
  'Acer',
  'LG',
  'Sony',
  'Microsoft',
];

async function main() {
  const organizations = [
    { name: 'TechCorp Solutions' },
    { name: 'Digital Innovations' },
    { name: 'Future Electronics' },
  ];

  for (const org of organizations) {
    const organization = await prisma.organization.create({
      data: {
        name: org.name,
        products: {
          create: Array.from({ length: 100 }, () => {
            const category =
              categories[Math.floor(Math.random() * categories.length)];
            const brand = brands[Math.floor(Math.random() * brands.length)];
            return {
              name: `${brand} ${category} ${Math.floor(Math.random() * 1000)}`,
              price: randomPrice(100, 2000),
              stock: randomStock(0, 100),
            };
          }),
        },
      },
    });

    const products = await prisma.product.findMany({
      where: { organizationId: Number(organization.id) },
      select: { price: true, stock: true },
    });

    const totalRevenue = products.reduce<number>(
      (sum: number, product: { price: Decimal; stock: number }) =>
        sum + Number(product.price) * product.stock,
      0,
    );
    const lowStockItems = products.filter(
      (product: { stock: number }) => product.stock < 10,
    ).length;

    await prisma.metric.create({
      data: {
        organizationId: Number(organization.id),
        totalRevenue,
        totalProducts: products.length,
        lowStockItems,
        date: new Date(),
      },
    });

    console.log(
      `Created organization ${org.name} with ${products.length} products`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
