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
exports.UsersLogin = exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../services/usuarios/users.service");
const jwt_1 = require("../../helpers/jwt");
const validateBody_middleware_1 = require("../../middleware/validateBody.middleware");
let UsersController = class UsersController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(body) {
        return this.service.create(body);
    }
    update(body) {
        return this.service.update(body.name, body.pin, body.id_device, body.email);
    }
    delete(query) {
        return this.service.delete(query.id);
    }
    findId(query) {
        if (query.id) {
            return this.service.findId(Number(query.id));
        }
        return this.service.findAll();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validateBody_middleware_1.ValidarBodyPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_1.JwtAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(new validateBody_middleware_1.ValidarBodyPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_1.JwtAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findId", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('Usuarios'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
let UsersLogin = class UsersLogin {
    service;
    constructor(service) {
        this.service = service;
    }
    signin(body) {
        return this.service.signin(body.pin, body.id_device);
    }
    recovery(body) {
        return this.service.recovery(body.pin, body.id_device, body.email);
    }
    signinGoogle(body) {
        return this.service.signinGoogle(body.idToken, body.id_device);
    }
};
exports.UsersLogin = UsersLogin;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validateBody_middleware_1.ValidarBodyPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersLogin.prototype, "signin", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(new validateBody_middleware_1.ValidarBodyPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersLogin.prototype, "recovery", null);
__decorate([
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)(new validateBody_middleware_1.ValidarBodyPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersLogin.prototype, "signinGoogle", null);
exports.UsersLogin = UsersLogin = __decorate([
    (0, common_1.Controller)('login'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersLogin);
//# sourceMappingURL=users.controller.js.map