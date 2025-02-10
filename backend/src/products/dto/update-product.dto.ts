import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'iPhone 13', description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100, description: 'Stock del producto' })
  @IsNumber()
  @Min(0)
  stock: number;
}
