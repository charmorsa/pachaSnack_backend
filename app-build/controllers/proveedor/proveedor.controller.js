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
exports.ProveeController = void 0;
const common_1 = require("@nestjs/common");
const proveedor_service_1 = require("../../services/proveedor/proveedor.service");
const jwt_1 = require("../../helpers/jwt");
let ProveeController = class ProveeController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(body) {
        return this.service.create(body);
    }
    delete(id) {
        return this.service.delete(Number(id));
    }
    find(id) {
        if (id) {
            return this.service.findId(Number(id));
        }
        return this.service.findAll();
    }
};
exports.ProveeController = ProveeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProveeController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProveeController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProveeController.prototype, "find", null);
exports.ProveeController = ProveeController = __decorate([
    (0, common_1.UseGuards)(jwt_1.JwtAuthGuard),
    (0, common_1.Controller)('Proveedores'),
    __metadata("design:paramtypes", [proveedor_service_1.ProveeService])
], ProveeController);
//# sourceMappingURL=proveedor.controller.js.map