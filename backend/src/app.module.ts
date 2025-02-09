import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemoryRepository } from './storage/memory.repository';
import { PrismaRepository } from './storage/prisma.repository';
import { MemorySeedService } from './storage/memory-seed.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProductsModule } from './products/products.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OrganizationsModule,
    ProductsModule,
    MetricsModule,
  ],
  providers: [
    MemoryRepository,
    PrismaRepository,
    PrismaService,
    {
      provide: 'REPOSITORY',
      useClass:
        process.env.STORAGE_TYPE === 'prisma'
          ? PrismaRepository
          : MemoryRepository,
    },
    ...(process.env.STORAGE_TYPE !== 'prisma' ? [MemorySeedService] : []),
  ],
  exports: ['REPOSITORY'],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly memorySeedService?: MemorySeedService) {}

  async onModuleInit() {
    if (process.env.STORAGE_TYPE !== 'prisma' && this.memorySeedService) {
      await this.memorySeedService.seed();
      console.log('Memory storage seeded with initial data');
    }
  }
}
