import { ProducService } from '../../services/productos/productos.service';
export declare class ProductoController {
    private readonly service;
    constructor(service: ProducService);
    create(body: {
        descripcion: string;
        tamaño: string;
        id_proveedor: number;
        precio: number;
        cantidad: number;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    update(body: {
        precio: number;
        cantidad: number;
        id: number;
    }): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
    }>;
    edit(body: {
        id: number;
        descripcion: string;
        id_proveedor: number;
        tamaño: string;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    delete(id: number): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    find(id?: number): Promise<{
        message: string;
        data: import("../../models/productos/productos.entity").Producto;
        statusCode: import("@nestjs/common").HttpStatus;
    }> | Promise<{
        message: string;
        data: import("../../models/productos/productos.entity").Producto[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
