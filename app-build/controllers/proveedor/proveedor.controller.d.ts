import { ProveeService } from '../../services/proveedor/proveedor.service';
export declare class ProveeController {
    private readonly service;
    constructor(service: ProveeService);
    create(body: {
        nombreEmpresa: string;
        email: string;
        telefono: string;
        nombreContacto: string;
        emailContacto: string;
        direccion: string;
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
        data: import("../../models/proveedor/proveedor.entity").Proveedor;
        statusCode: import("@nestjs/common").HttpStatus;
    }> | Promise<{
        message: string;
        data: import("../../models/proveedor/proveedor.entity").Proveedor[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
