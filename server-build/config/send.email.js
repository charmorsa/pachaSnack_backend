"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const cli_color_1 = __importDefault(require("cli-color"));
const nodemailer = __importStar(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const env_1 = require("./env");
async function sendEmail(receptor, subject, text) {
    try {
        if (!env_1.env.smtp.user || !env_1.env.smtp.pass) {
            throw new Error('Faltan las variables SMTP_USER o SMTP_PASS');
        }
        const fecha = new Date();
        const transporter = nodemailer.createTransport({
            host: env_1.env.smtp.host,
            port: env_1.env.smtp.port,
            secure: env_1.env.smtp.secure,
            auth: {
                user: env_1.env.smtp.user,
                pass: env_1.env.smtp.pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const imagePath = path_1.default.join(__dirname, '../../pacha.png');
        const imageContent = (0, fs_1.readFileSync)(imagePath);
        const [m0 = '', m1 = '', m2 = '', m3 = '', m4 = '', m5 = '', m6 = '', m7 = '',] = text;
        const mailOptions = {
            from: env_1.env.smtp.user,
            to: receptor,
            subject,
            html: `
                <div style="border: 4px solid grey; padding: 20px; text-align: center; margin: auto; width: auto; background-color: #536566;">
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto; background-color: #0A4467;">
                        <img src="cid:pacha"/>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto;background-color: #2D85CC;">
                        <h2>${subject}</h2>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto;background-color:#FFFFF0;">
                        <h4>---------------------------------------------------------</h4>
                        <h3>${m0}</h3>
                        <h3>${m1}</h3>
                        <h3>${m2}</h3>
                        <h3>${m3}</h3>
                        <h3>${m4}</h3>
                        <h3>${m5}</h3>
                        <h3>${m6}</h3>
                        <h3>${m7}</h3>
                        <h4>---------------------------------------------------------</h4>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto; background-color: #D6C552;">
                        <p>©${fecha.toISOString()} --PachaSnack--</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'pacha.png',
                    content: imageContent,
                    cid: 'pacha',
                },
            ],
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(cli_color_1.default.cyan('Correo enviado:', info.response));
        return true;
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return false;
    }
}
//# sourceMappingURL=send.email.js.map