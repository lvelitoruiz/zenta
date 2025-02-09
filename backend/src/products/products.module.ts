import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { MemoryRepository } from '../storage/memory.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    {
      provide: 'REPOSITORY',
      useClass: MemoryRepository,
    },
  ],
})
export class ProductsModule {}
