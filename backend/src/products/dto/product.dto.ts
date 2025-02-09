import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID único del producto' })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Laptop Dell XPS',
    description: 'Nombre del producto',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock' })
  @IsInt()
  stock: number;

  @ApiProperty({ example: 1, description: 'ID de la organización' })
  @IsInt()
  organizationId: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop Dell XPS',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock' })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 1, description: 'ID de la organización' })
  @IsInt()
  @IsNotEmpty()
  organizationId: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Laptop Dell XPS Updated' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 1099.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 45 })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;
}
