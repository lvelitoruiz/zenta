import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrganizationDto } from './dto/organization.dto';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las organizaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de organizaciones',
    type: [OrganizationDto],
  })
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una organización por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la organización' })
  @ApiResponse({
    status: 200,
    description: 'Organización encontrada',
    type: OrganizationDto,
  })
  @ApiResponse({ status: 404, description: 'Organización no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.organizationsService.findOne(id);
  }
}
