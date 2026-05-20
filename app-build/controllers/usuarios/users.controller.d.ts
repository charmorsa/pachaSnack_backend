import { UsersService } from '../../services/usuarios/users.service';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(body: {
        name: string;
        pin: number;
        email: string;
        id_device: string;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    update(body: {
        name: string;
        pin: number;
        id_device: string;
        email: string;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    delete(query: {
        id: number;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findId(query: {
        id: number;
    }): Promise<{
        message: string;
        data: import("../../models/usuarios/users.entity").User;
        statusCode: import("@nestjs/common").HttpStatus;
    }> | Promise<{
        message: string;
        data: import("../../models/usuarios/users.entity").User[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
export declare class UsersLogin {
    private readonly service;
    constructor(service: UsersService);
    signin(body: {
        pin: number;
        id_device: string;
    }): Promise<{
        message: string;
        accessToken: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    recovery(body: {
        pin: number;
        id_device: string;
        email: string;
    }): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    signinGoogle(body: {
        idToken: string;
        id_device: string;
    }): Promise<{
        message: string;
        accessToken: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
