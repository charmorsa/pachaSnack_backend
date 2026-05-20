import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Proveedor } from '../../models/proveedor/proveedor.entity';
export declare class ProveeService {
    private repo;
    constructor(repo: Repository<Proveedor>);
    create(data: Partial<Proveedor>): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        message: string;
        data: Proveedor[];
        statusCode: HttpStatus;
    }>;
    findId(id: number): Promise<{
        message: string;
        data: Proveedor;
        statusCode: HttpStatus;
    }>;
    delete(id: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
