"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./models/usuarios/users.module");
const productos_module_1 = require("./models/productos/productos.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const proveedor_module_1 = require("./models/proveedor/proveedor.module");
const env_1 = require("./config/env");
const IS_PRODUCTION = env_1.env.nodeEnv === 'production';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: env_1.env.db.host,
                port: env_1.env.db.port,
                username: env_1.env.db.user,
                password: env_1.env.db.pass,
                database: env_1.env.db.name,
                autoLoadEntities: true,
                synchronize: !IS_PRODUCTION,
                logging: !IS_PRODUCTION,
                retryAttempts: 10,
                retryDelay: 3000,
                options: {
                    encrypt: false,
                    trustServerCertificate: true,
                },
            }),
            users_module_1.UsersModule,
            productos_module_1.ProductoModule,
            proveedor_module_1.ProveedorModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map