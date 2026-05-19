import clc from 'cli-color';
import * as nodemailer from 'nodemailer';
import path from 'path';
import { readFileSync } from 'fs';
import { env } from './env';

export async function sendEmail(
  receptor: string,
  subject: string,
  text: readonly string[],
) {
  try {
    if (!env.smtp.user || !env.smtp.pass) {
      throw new Error('Faltan las variables SMTP_USER o SMTP_PASS');
    }

    const fecha = new Date();
    const transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const imagePath = path.join(__dirname, '../../pacha.png');
    const imageContent = readFileSync(imagePath);

    const [
      m0 = '',
      m1 = '',
      m2 = '',
      m3 = '',
      m4 = '',
      m5 = '',
      m6 = '',
      m7 = '',
    ] = text;

    const mailOptions = {
      // Credenciales fuera del código: evita exponer contraseñas en el repositorio.
      from: env.smtp.user,
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
    console.log(clc.cyan('Correo enviado:', info.response));
    return true;
  } catch (error) {
    console.error(clc.red('Error, contactese con el administrador', error));
    return false;
  }
}
