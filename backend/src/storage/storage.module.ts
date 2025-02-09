import { Global, Module } from '@nestjs/common';
import { MemoryRepository } from './memory.repository';
import { PrismaRepository } from './prisma.repository';
import { MemorySeedService } from './memory-seed.service';

@Global()
@Module({
  providers: [
    MemoryRepository,
    PrismaRepository,
    MemorySeedService,
    {
      provide: 'REPOSITORY',
      useClass:
        process.env.STORAGE_TYPE === 'prisma'
          ? PrismaRepository
          : MemoryRepository,
    },
  ],
  exports: ['REPOSITORY', MemorySeedService],
})
export class StorageModule {}
