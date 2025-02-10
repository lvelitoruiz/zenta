import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { StorageModule } from '../storage/storage.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [StorageModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, PrismaService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
