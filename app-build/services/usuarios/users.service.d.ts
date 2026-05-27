import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/usuarios/users.entity';
import { PushService } from '../push/push.service';
export declare class UsersService {
    private repo;
    private jwtService;
    private readonly pushService;
    constructor(repo: Repository<User>, jwtService: JwtService, pushService: PushService);
    private signUserToken;
    private verifyGoogleIdToken;
    create(data: Partial<User>): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    signin(pin: number, id_device: string): Promise<{
        message: string;
        accessToken: string;
        statusCode: HttpStatus;
    }>;
    signinGoogle(idToken: string, id_device: string): Promise<{
        message: string;
        accessToken: string;
        statusCode: HttpStatus;
    }>;
    recovery(pin: number, id_device: string, email: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    update(name: string, pin: number, id_device: string, email: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    delete(id: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        message: string;
        data: User[];
        statusCode: HttpStatus;
    }>;
    findId(id: number): Promise<{
        message: string;
        data: User;
        statusCode: HttpStatus;
    }>;
}
