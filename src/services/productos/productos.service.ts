import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../models/productos/productos.entity';
import { Proveedor } from '../../models/proveedor/proveedor.entity';

@Injectable()
export class ProducService {
  constructor(
    @InjectRepository(Producto)
    private repo: Repository<Producto>,

    @InjectRepository(Proveedor)
    private prov: Repository<Proveedor>,
  ) {}

  async create(data: Partial<Producto>) {
    const descripcion = data.descripcion;
    const tamaño = data.tamaño;
    const id_proveedor = data.id_proveedor;
    const precio = data.precio;
    const cantidad = data.cantidad;

    const valiProv = await this.prov.findOne({ where: { id: id_proveedor } });
    if (!valiProv) throw new BadRequestException('El proveedor no existe');

    if (precio < 1)
      throw new BadRequestException('El precio debe ser mayor a 0');
    if (cantidad < 0)
      throw new BadRequestException('La cantidad no puede ser negativa');

    const valiProd = await this.repo.findOne({
      where: { descripcion, tamaño },
    });
    if (valiProd) throw new BadRequestException('El producto ya existe');

    try {
      await this.repo.save(data);
      return {
        message: 'Producto creado exitosamente',
        statusCode: HttpStatus.OK,
      };
    } catch {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll() {
    const lista = await this.repo.find();
    if (lista.length === 0)
      throw new BadRequestException('No hay productos registrados');

    return {
      message: 'Lista de productos',
      data: lista,
      statusCode: HttpStatus.OK,
    };
  }

  async findId(id: number) {
    const lista = await this.repo.findOne({ where: { id } });
    if (!lista) throw new BadRequestException('El producto no existe');

    return {
      message: 'Producto encontrado',
      data: lista,
      statusCode: HttpStatus.OK,
    };
  }

  async update(precio: number, cantidad: number, id: number) {
    const valiProd = await this.repo.findOne({ where: { id } });
    if (!valiProd) throw new BadRequestException('El producto no existe');

    if (precio < 1)
      throw new BadRequestException('El precio debe ser mayor a 0');
    if (cantidad < 0)
      throw new BadRequestException('La cantidad no puede ser negativa');

    try {
      await this.repo.update({ id }, { precio, cantidad });
      return {
        message: 'Producto actualizado exitosamente',
        status: HttpStatus.OK,
      };
    } catch {
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async edit(
    id: number,
    descripcion: string,
    id_proveedor: number,
    tamaño: string,
  ) {
    const valiProd = await this.repo.findOne({ where: { id } });
    if (!valiProd) throw new BadRequestException('El producto no existe');

    const valiProv = await this.prov.findOne({ where: { id: id_proveedor } });
    if (!valiProv) throw new BadRequestException('El proveedor no existe');

    try {
      await this.repo.update({ id }, { id_proveedor, descripcion, tamaño });
      return {
        message: 'Producto editado exitosamente',
        statusCode: HttpStatus.OK,
      };
    } catch {
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }
}
