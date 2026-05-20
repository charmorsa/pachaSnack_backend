"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarBodyPipe = void 0;
const common_1 = require("@nestjs/common");
let ValidarBodyPipe = class ValidarBodyPipe {
    transform(value) {
        if (!value ||
            typeof value !== 'object' ||
            Object.keys(value).length === 0) {
            throw new common_1.BadRequestException('Body vacío');
        }
        return value;
    }
};
exports.ValidarBodyPipe = ValidarBodyPipe;
exports.ValidarBodyPipe = ValidarBodyPipe = __decorate([
    (0, common_1.Injectable)()
], ValidarBodyPipe);
//# sourceMappingURL=validateBody.middleware.js.map