import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Producto } from '../../models/productos/productos.entity';
import { Proveedor } from '../../models/proveedor/proveedor.entity';
export declare class ProducService {
    private repo;
    private prov;
    constructor(repo: Repository<Producto>, prov: Repository<Proveedor>);
    create(data: Partial<Producto>): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        message: string;
        data: Producto[];
        statusCode: HttpStatus;
    }>;
    findId(id: number): Promise<{
        message: string;
        data: Producto;
        statusCode: HttpStatus;
    }>;
    update(precio: number, cantidad: number, id: number): Promise<{
        message: string;
        status: HttpStatus;
    }>;
    edit(id: number, descripcion: string, id_proveedor: number, tamaño: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
