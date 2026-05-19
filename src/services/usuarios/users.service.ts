import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/usuarios/users.entity';
import { sendMessage } from '../../config/input.rabbitMQ';
import { env } from '../../config/env';

type GoogleTokenInfo = {
  aud: string;
  email: string;
  email_verified: boolean | string;
  name?: string;
  sub: string;
};

function isGoogleTokenInfo(value: unknown): value is GoogleTokenInfo {
  if (!value || typeof value !== 'object') return false;

  const token = value as Partial<GoogleTokenInfo>;
  return (
    typeof token.aud === 'string' &&
    typeof token.email === 'string' &&
    typeof token.sub === 'string' &&
    (typeof token.email_verified === 'boolean' ||
      typeof token.email_verified === 'string')
  );
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private signUserToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      idDevice: user.id_device,
      email: user.email,
    });
  }

  private async verifyGoogleIdToken(idToken: string) {
    if (env.googleClientIds.length === 0) {
      throw new InternalServerErrorException(
        'Falta configurar GOOGLE_CLIENT_IDS',
      );
    }

    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
    );

    if (!response.ok) {
      throw new UnauthorizedException('Token de Google inválido');
    }

    const tokenInfo: unknown = await response.json();

    if (!isGoogleTokenInfo(tokenInfo)) {
      throw new UnauthorizedException('Respuesta de Google inválida');
    }

    if (!env.googleClientIds.includes(tokenInfo.aud)) {
      throw new UnauthorizedException('Cliente de Google no autorizado');
    }

    const emailVerified =
      tokenInfo.email_verified === true || tokenInfo.email_verified === 'true';

    if (!emailVerified) {
      throw new UnauthorizedException('Email de Google no verificado');
    }

    return {
      email: tokenInfo.email,
      name: tokenInfo.name ?? tokenInfo.email.split('@')[0],
    };
  }

  async create(data: Partial<User>) {
    const email = data.email;
    const pin = data.pin;

    const valiEmail = await this.repo.findOne({ where: { email } });
    if (valiEmail) throw new ConflictException('Datos ya registrados');

    try {
      await this.repo.save(data);

      const fecha = new Date();
      const types = 'Recuperar PIN';
      const text = [
        `Hola...`,
        `Bienvenido a nuestra APP`,
        `Queriamos avisarte que tu usuario fue creado con exito.`,
        `El dia de hoy: ${fecha.toISOString()} podras obtener toda la informacion requerida.`,
        `Podras consultar precios o comunicarte con nosotros directamente.`,
        `Este es tu PIN: ${pin}, con el podras acceder desde tu celular.`,
        `Gracias por elegirnos.`,
      ];
      const messages = {
        email,
        types,
        text,
      };
      await sendMessage('email', JSON.stringify(messages));

      return {
        message: 'Operación exitosa',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Generic');
    }
  }

  async signin(pin: number, id_device: string) {
    const datos = await this.repo.findOne({ where: { pin, id_device } });
    if (!datos) throw new BadRequestException('No se encontraron datos');

    try {
      const token = this.signUserToken(datos);

      return {
        message: 'Operación exitosa',
        accessToken: token,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Generic');
    }
  }

  async signinGoogle(idToken: string, id_device: string) {
    const googleUser = await this.verifyGoogleIdToken(idToken);
    let user = await this.repo.findOne({ where: { email: googleUser.email } });

    if (!user) {
      user = await this.repo.save({
        name: googleUser.name,
        email: googleUser.email,
        id_device,
      });
    } else if (id_device && user.id_device !== id_device) {
      await this.repo.update({ id: user.id }, { id_device });
      user.id_device = id_device;
    }

    return {
      message: 'Operación exitosa',
      accessToken: this.signUserToken(user),
      statusCode: HttpStatus.OK,
    };
  }

  async recovery(pin: number, id_device: string, email: string) {
    try {
      const fecha = new Date();
      const types = 'Recuperar PIN';
      const text = [
        `Hola...`,
        `Te olvidaste tu PIN?.`,
        `Detecte que cambiaste tu pin de Acceso.`,
        `Te informo que se cambio tu pin el dia de hoy ${fecha.toISOString()}`,
        `Si fuiste tú, ignora este correo.`,
        `Si no fuiste tú, haznoslo saber...`,
        `PIN: ${pin}`,
      ];
      const messages = {
        email,
        types,
        text,
      };
      await sendMessage('email', JSON.stringify(messages));
      await this.repo.update({ email }, { pin, id_device });
      return {
        message: 'Operación exitosa',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Generic');
    }
  }

  async update(name: string, pin: number, id_device: string, email: string) {
    const datos = await this.repo.findOne({ where: { email } });
    if (!datos) throw new BadRequestException('No se encontraron datos');

    try {
      await this.repo.update({ email }, { name, pin, id_device });

      return {
        message: 'Operación exitosa',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Generic');
    }
  }

  async delete(id: number) {
    const datos = await this.repo.findOne({ where: { id } });
    if (!datos) throw new BadRequestException('No se encontraron datos');

    try {
      await this.repo.delete({ id });

      const fecha = new Date();
      const types = 'Recuperar PIN';
      const text = [
        `Lamentamos decirte adios...`,
        `Se confirmo tu ida.`,
        `Esperamos que podamos reencontrarnos en otras ocaciones.`,
        `El dia de hoy: ${fecha.toISOString()}, fue confirmada tu acceso a nuestra aplicacion.`,
        `Podras volver cuando gustes.`,
        `Gracias por compartir.`,
      ];
      const messages = {
        email: datos.email,
        types,
        text,
      };
      await sendMessage('email', JSON.stringify(messages));

      return {
        message: 'Operación exitosa',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Generic');
    }
  }

  async findAll() {
    const datos = await this.repo.find();
    if (!datos) throw new BadRequestException('No se encontraron datos');

    return {
      message: 'Operación exitosa',
      data: datos,
      statusCode: HttpStatus.OK,
    };
  }

  async findId(id: number) {
    const datos = await this.repo.findOne({ where: { id } });
    if (!datos) throw new BadRequestException('No se encontraron datos');

    return {
      message: 'Operación exitosa',
      data: datos,
      statusCode: HttpStatus.OK,
    };
  }
}
