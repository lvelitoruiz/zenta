import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IRepository } from '../common/interfaces/repository.interface';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    @Inject('REPOSITORY')
    private readonly repository: IRepository,
  ) {}

  async findAll(organizationId: number, page = 1, limit = 10) {
    console.log('Service - Finding products for org:', organizationId); // Debug
    const result = await this.repository.getProducts(
      organizationId,
      page,
      limit,
    );
    console.log('Service - Found products:', result); // Debug
    return result;
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      stock: product.stock,
      organizationId: product.organizationId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async create(data: CreateProductDto): Promise<ProductDto> {
    try {
      const organization = await this.prisma.organization.findUnique({
        where: { id: data.organizationId },
      });

      if (!organization) {
        throw new NotFoundException(
          `Organización con ID ${data.organizationId} no encontrada`,
        );
      }

      if (data.price < 0) {
        throw new BadRequestException('El precio no puede ser negativo');
      }

      if (data.stock < 0) {
        throw new BadRequestException('El stock no puede ser negativo');
      }

      const product = (await this.prisma.product.create({
        data: {
          ...data,
          price: new Decimal(data.price),
        },
      })) as Product;

      return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        stock: product.stock,
        organizationId: product.organizationId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.repository.updateProduct(id, updateProductDto);
  }

  async remove(id: number) {
    return this.repository.deleteProduct(id);
  }
}
