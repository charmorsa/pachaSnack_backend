"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("../../models/usuarios/users.entity");
const input_rabbitMQ_1 = require("../../config/input.rabbitMQ");
const env_1 = require("../../config/env");
function isGoogleTokenInfo(value) {
    if (!value || typeof value !== 'object')
        return false;
    const token = value;
    return (typeof token.aud === 'string' &&
        typeof token.email === 'string' &&
        typeof token.sub === 'string' &&
        (typeof token.email_verified === 'boolean' ||
            typeof token.email_verified === 'string'));
}
let UsersService = class UsersService {
    repo;
    jwtService;
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    signUserToken(user) {
        return this.jwtService.sign({
            id: user.id,
            idDevice: user.id_device,
            email: user.email,
        });
    }
    async verifyGoogleIdToken(idToken) {
        if (env_1.env.googleClientIds.length === 0) {
            throw new common_1.InternalServerErrorException('Falta configurar GOOGLE_CLIENT_IDS');
        }
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
        if (!response.ok) {
            throw new common_1.UnauthorizedException('Token de Google inválido');
        }
        const tokenInfo = await response.json();
        if (!isGoogleTokenInfo(tokenInfo)) {
            throw new common_1.UnauthorizedException('Respuesta de Google inválida');
        }
        if (!env_1.env.googleClientIds.includes(tokenInfo.aud)) {
            throw new common_1.UnauthorizedException('Cliente de Google no autorizado');
        }
        const emailVerified = tokenInfo.email_verified === true || tokenInfo.email_verified === 'true';
        if (!emailVerified) {
            throw new common_1.UnauthorizedException('Email de Google no verificado');
        }
        return {
            email: tokenInfo.email,
            name: tokenInfo.name ?? tokenInfo.email.split('@')[0],
        };
    }
    async create(data) {
        const email = data.email;
        const pin = data.pin;
        const valiEmail = await this.repo.findOne({ where: { email } });
        if (valiEmail)
            throw new common_1.ConflictException('Datos ya registrados');
        try {
            await this.repo.save(data);
            const fecha = new Date();
            const types = 'Recuperar PIN';
            const text = [
                `Hola...`,
                `Bienvenido a nuestra APP`,
                `Queriamos avisarte que tu usuario fue creado con exito.`,
                `El dia de hoy: ${fecha.toISOString()} podras obtener toda la informacion requerida.`,
                `Podras consultar precios o comunicarte con nosotros directamente.`,
                `Este es tu PIN: ${pin}, con el podras acceder desde tu celular.`,
                `Gracias por elegirnos.`,
            ];
            const messages = {
                email,
                types,
                text,
            };
            await (0, input_rabbitMQ_1.sendMessage)('email', JSON.stringify(messages));
            return {
                message: 'Operación exitosa',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Generic');
        }
    }
    async signin(pin, id_device) {
        const datos = await this.repo.findOne({ where: { pin, id_device } });
        if (!datos)
            throw new common_1.BadRequestException('No se encontraron datos');
        try {
            const token = this.signUserToken(datos);
            return {
                message: 'Operación exitosa',
                accessToken: token,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Generic');
        }
    }
    async signinGoogle(idToken, id_device) {
        const googleUser = await this.verifyGoogleIdToken(idToken);
        let user = await this.repo.findOne({ where: { email: googleUser.email } });
        if (!user) {
            user = await this.repo.save({
                name: googleUser.name,
                email: googleUser.email,
                id_device,
            });
        }
        else if (id_device && user.id_device !== id_device) {
            await this.repo.update({ id: user.id }, { id_device });
            user.id_device = id_device;
        }
        return {
            message: 'Operación exitosa',
            accessToken: this.signUserToken(user),
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async recovery(pin, id_device, email) {
        try {
            const fecha = new Date();
            const types = 'Recuperar PIN';
            const text = [
                `Hola...`,
                `Te olvidaste tu PIN?.`,
                `Detecte que cambiaste tu pin de Acceso.`,
                `Te informo que se cambio tu pin el dia de hoy ${fecha.toISOString()}`,
                `Si fuiste tú, ignora este correo.`,
                `Si no fuiste tú, haznoslo saber...`,
                `PIN: ${pin}`,
            ];
            const messages = {
                email,
                types,
                text,
            };
            await (0, input_rabbitMQ_1.sendMessage)('email', JSON.stringify(messages));
            await this.repo.update({ email }, { pin, id_device });
            return {
                message: 'Operación exitosa',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Generic');
        }
    }
    async update(name, pin, id_device, email) {
        const datos = await this.repo.findOne({ where: { email } });
        if (!datos)
            throw new common_1.BadRequestException('No se encontraron datos');
        try {
            await this.repo.update({ email }, { name, pin, id_device });
            return {
                message: 'Operación exitosa',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Generic');
        }
    }
    async delete(id) {
        const datos = await this.repo.findOne({ where: { id } });
        if (!datos)
            throw new common_1.BadRequestException('No se encontraron datos');
        try {
            await this.repo.delete({ id });
            const fecha = new Date();
            const types = 'Recuperar PIN';
            const text = [
                `Lamentamos decirte adios...`,
                `Se confirmo tu ida.`,
                `Esperamos que podamos reencontrarnos en otras ocaciones.`,
                `El dia de hoy: ${fecha.toISOString()}, fue confirmada tu acceso a nuestra aplicacion.`,
                `Podras volver cuando gustes.`,
                `Gracias por compartir.`,
            ];
            const messages = {
                email: datos.email,
                types,
                text,
            };
            await (0, input_rabbitMQ_1.sendMessage)('email', JSON.stringify(messages));
            return {
                message: 'Operación exitosa',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Generic');
        }
    }
    async findAll() {
        const datos = await this.repo.find();
        if (!datos)
            throw new common_1.BadRequestException('No se encontraron datos');
        return {
            message: 'Operación exitosa',
            data: datos,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findId(id) {
        const datos = await this.repo.findOne({ where: { id } });
        if (!datos)
            throw new common_1.BadRequestException('No se encontraron datos');
        return {
            message: 'Operación exitosa',
            data: datos,
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map