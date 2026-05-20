"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cli_color_1 = __importDefault(require("cli-color"));
const received_message_1 = require("./config/received.message");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: env_1.env.corsOrigin === '*' ? true : env_1.env.corsOrigin.split(','),
    });
    await app.listen(env_1.env.port, '0.0.0.0');
    console.log(cli_color_1.default.blueBright('##############################################'));
    console.log(cli_color_1.default.yellowBright(`Servidor iniciado en el puerto: ${env_1.env.port}`));
    console.log(cli_color_1.default.blueBright('##############################################'));
    await (0, received_message_1.consumeMessagesEmail)('email');
}
bootstrap().catch((error) => {
    console.error(cli_color_1.default.red('Error al iniciar el servidor', error));
    process.exit(1);
});
//# sourceMappingURL=main.js.map