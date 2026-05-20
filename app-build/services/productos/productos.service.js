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
exports.ProducService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productos_entity_1 = require("../../models/productos/productos.entity");
const proveedor_entity_1 = require("../../models/proveedor/proveedor.entity");
let ProducService = class ProducService {
    repo;
    prov;
    constructor(repo, prov) {
        this.repo = repo;
        this.prov = prov;
    }
    async create(data) {
        const descripcion = data.descripcion;
        const tamaño = data.tamaño;
        const id_proveedor = data.id_proveedor;
        const precio = data.precio;
        const cantidad = data.cantidad;
        const valiProv = await this.prov.findOne({ where: { id: id_proveedor } });
        if (!valiProv)
            throw new common_1.BadRequestException('El proveedor no existe');
        if (precio < 1)
            throw new common_1.BadRequestException('El precio debe ser mayor a 0');
        if (cantidad < 0)
            throw new common_1.BadRequestException('La cantidad no puede ser negativa');
        const valiProd = await this.repo.findOne({
            where: { descripcion, tamaño },
        });
        if (valiProd)
            throw new common_1.BadRequestException('El producto ya existe');
        try {
            await this.repo.save(data);
            return {
                message: 'Producto creado exitosamente',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al crear el producto');
        }
    }
    async findAll() {
        const lista = await this.repo.find();
        return {
            message: lista.length === 0
                ? 'No hay productos registrados'
                : 'Lista de productos',
            data: lista,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findId(id) {
        const lista = await this.repo.findOne({ where: { id } });
        if (!lista)
            throw new common_1.BadRequestException('El producto no existe');
        return {
            message: 'Producto encontrado',
            data: lista,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async update(precio, cantidad, id) {
        const valiProd = await this.repo.findOne({ where: { id } });
        if (!valiProd)
            throw new common_1.BadRequestException('El producto no existe');
        if (precio < 1)
            throw new common_1.BadRequestException('El precio debe ser mayor a 0');
        if (cantidad < 0)
            throw new common_1.BadRequestException('La cantidad no puede ser negativa');
        try {
            await this.repo.update({ id }, { precio, cantidad });
            return {
                message: 'Producto actualizado exitosamente',
                status: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al actualizar el producto');
        }
    }
    async edit(id, descripcion, id_proveedor, tamaño) {
        const valiProd = await this.repo.findOne({ where: { id } });
        if (!valiProd)
            throw new common_1.BadRequestException('El producto no existe');
        const valiProv = await this.prov.findOne({ where: { id: id_proveedor } });
        if (!valiProv)
            throw new common_1.BadRequestException('El proveedor no existe');
        try {
            await this.repo.update({ id }, { id_proveedor, descripcion, tamaño });
            return {
                message: 'Producto editado exitosamente',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al actualizar el producto');
        }
    }
    async delete(id) {
        const producto = await this.repo.findOne({ where: { id } });
        if (!producto)
            throw new common_1.BadRequestException('El producto no existe');
        try {
            await this.repo.delete({ id });
            return {
                message: 'Producto eliminado exitosamente',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al eliminar el producto');
        }
    }
};
exports.ProducService = ProducService;
exports.ProducService = ProducService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(productos_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProducService);
//# sourceMappingURL=productos.service.js.map