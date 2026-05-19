import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../../models/proveedor/proveedor.entity';

@Injectable()
export class ProveeService {
  constructor(
    @InjectRepository(Proveedor)
    private repo: Repository<Proveedor>,
  ) {}

  async create(data: Partial<Proveedor>) {
    const nombreEmpresa = data.nombreEmpresa;
    const email = data.email;

    const validProvEmail = await this.repo.findOne({ where: { email } });
    if (validProvEmail)
      throw new BadRequestException('Proveedor con este email ya existe');

    const validProvName = await this.repo.findOne({ where: { nombreEmpresa } });
    if (validProvName)
      throw new BadRequestException('Proveedor con este nombre ya existe');

    try {
      await this.repo.save(data);

      return {
        message: 'Operacion exitosa',
        statusCode: HttpStatus.OK,
      };
    } catch {
      throw new InternalServerErrorException('Error al crear el proveedor');
    }
  }

  async findAll() {
    const lista = await this.repo.find();
    if (lista.length === 0)
      throw new BadRequestException('No hay proveedores registrados');

    return {
      message: 'Lista de proveedores',
      data: lista,
      statusCode: HttpStatus.OK,
    };
  }

  async findId(id: number) {
    const lista = await this.repo.findOne({ where: { id } });
    if (!lista) throw new BadRequestException('El proveedor no existe');

    return {
      message: 'Proveedor encontrado',
      data: lista,
      statusCode: HttpStatus.OK,
    };
  }
}
