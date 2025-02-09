import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationDto } from './dto/organization.dto';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<OrganizationDto[]> {
    const organizations =
      (await this.prisma.organization.findMany()) as Organization[];
    return organizations.map((org: Organization) => ({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    }));
  }

  async findOne(id: number): Promise<OrganizationDto | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    });

    return organization
      ? {
          id: organization.id,
          name: organization.name,
          createdAt: organization.createdAt,
          updatedAt: organization.updatedAt,
        }
      : null;
  }
}
