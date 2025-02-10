import { Injectable, Inject } from '@nestjs/common';
import { OrganizationDto } from './dto/organization.dto';
import { IRepository } from '../common/interfaces/repository.interface';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: IRepository,
  ) {}

  async findAll(): Promise<OrganizationDto[]> {
    return this.repository.getOrganizations();
  }

  async findOne(id: number): Promise<OrganizationDto | null> {
    return this.repository.getOrganization(id);
  }
}
