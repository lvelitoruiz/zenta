import { IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
  @ApiProperty({ example: 1, description: 'ID único de la organización' })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Acme Corp',
    description: 'Nombre de la organización',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de creación',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de última actualización',
  })
  @IsDate()
  updatedAt: Date;
}
