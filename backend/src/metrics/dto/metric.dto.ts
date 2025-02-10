import { IsNumber, IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MetricDto {
  @ApiProperty({ example: 1, description: 'ID único de la métrica' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1, description: 'ID de la organización' })
  @IsInt()
  organizationId: number;

  @ApiProperty({ example: 50000, description: 'Ingresos totales' })
  @IsNumber()
  totalRevenue: number;

  @ApiProperty({ example: 100, description: 'Total de productos' })
  @IsInt()
  totalProducts: number;

  @ApiProperty({ example: 5, description: 'Productos con stock bajo' })
  @IsInt()
  lowStockItems: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de la métrica',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de creación',
  })
  createdAt: Date;
}

export class MetricsOverviewDto {
  @ApiProperty({ example: 50000, description: 'Ingresos totales' })
  @IsNumber()
  totalRevenue: number;

  @ApiProperty({ example: 100, description: 'Total de productos' })
  @IsInt()
  totalProducts: number;

  @ApiProperty({ example: 5, description: 'Productos con stock bajo' })
  @IsInt()
  lowStockItems: number;

  @ApiProperty({
    example: 'Electrónicos',
    description: 'Categoría más vendida',
  })
  @IsString()
  topCategory: string;

  @ApiProperty({
    example: 23.5,
    description: 'Crecimiento de la categoría top',
  })
  @IsNumber()
  categoryGrowth: number;

  @ApiProperty({ example: 8, description: 'Número de categorías activas' })
  @IsInt()
  categoriesActive: number;

  @ApiProperty({ example: 32.4, description: 'Margen promedio por categoría' })
  @IsNumber()
  avgCategoryMargin: number;
}
