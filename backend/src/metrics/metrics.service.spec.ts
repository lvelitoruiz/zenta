import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

describe('MetricsService', () => {
  let service: MetricsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
            },
            metric: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOverview', () => {
    it('should return metrics overview', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          price: new Decimal('100'),
          stock: 5,
          organizationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Product 2',
          price: new Decimal('200'),
          stock: 3,
          organizationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);

      const result = await service.getOverview(1);

      expect(result).toEqual({
        totalRevenue: 1100,
        totalProducts: 2,
        lowStockItems: 2,
        averagePrice: 150,
      });
    });
  });
});
