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
exports.ProveeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proveedor_entity_1 = require("../../models/proveedor/proveedor.entity");
let ProveeService = class ProveeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const nombreEmpresa = data.nombreEmpresa;
        const email = data.email;
        const validProvEmail = await this.repo.findOne({ where: { email } });
        if (validProvEmail)
            throw new common_1.BadRequestException('Proveedor con este email ya existe');
        const validProvName = await this.repo.findOne({ where: { nombreEmpresa } });
        if (validProvName)
            throw new common_1.BadRequestException('Proveedor con este nombre ya existe');
        try {
            await this.repo.save(data);
            return {
                message: 'Operacion exitosa',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al crear el proveedor');
        }
    }
    async findAll() {
        const lista = await this.repo.find();
        return {
            message: lista.length === 0
                ? 'No hay proveedores registrados'
                : 'Lista de proveedores',
            data: lista,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findId(id) {
        const lista = await this.repo.findOne({ where: { id } });
        if (!lista)
            throw new common_1.BadRequestException('El proveedor no existe');
        return {
            message: 'Proveedor encontrado',
            data: lista,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async delete(id) {
        const proveedor = await this.repo.findOne({ where: { id } });
        if (!proveedor)
            throw new common_1.BadRequestException('El proveedor no existe');
        try {
            await this.repo.delete({ id });
            return {
                message: 'Proveedor eliminado exitosamente',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al eliminar el proveedor');
        }
    }
};
exports.ProveeService = ProveeService;
exports.ProveeService = ProveeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProveeService);
//# sourceMappingURL=proveedor.service.js.map