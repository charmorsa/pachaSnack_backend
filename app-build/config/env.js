"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Falta configurar la variable de entorno ${name}`);
    }
    return value;
}
function optionalEnv(name, fallback) {
    return process.env[name] ?? fallback;
}
function numberEnv(name, fallback) {
    const value = process.env[name];
    if (!value) {
        if (fallback !== undefined)
            return fallback;
        throw new Error(`Falta configurar la variable de entorno ${name}`);
    }
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
        throw new Error(`La variable ${name} debe ser un número válido`);
    }
    return parsedValue;
}
function listEnv(name) {
    return (process.env[name] ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
}
exports.env = {
    port: numberEnv('PORT', 3000),
    nodeEnv: optionalEnv('NODE_ENV', 'development'),
    corsOrigin: optionalEnv('CORS_ORIGIN', '*'),
    jwtSecret: requireEnv('JWT'),
    googleClientIds: listEnv('GOOGLE_CLIENT_IDS'),
    db: {
        host: requireEnv('DB_HOST'),
        port: numberEnv('DB_PORT'),
        user: requireEnv('DB_USER'),
        pass: requireEnv('DB_PASS'),
        name: optionalEnv('DB_NAME', 'master'),
    },
    rabbitmq: {
        url: requireEnv('RABBITMQ_HOST'),
    },
    smtp: {
        host: optionalEnv('SMTP_HOST', 'smtp.gmail.com'),
        port: numberEnv('SMTP_PORT', 465),
        secure: process.env.SMTP_SECURE !== 'false',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};
//# sourceMappingURL=env.js.map