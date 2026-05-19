import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard } from '@nestjs/passport';
import { env } from '../config/env';

type JwtPayload = {
  email: string;
  id: number;
  idDevice?: string;
  id_device?: string;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
    });
  }

  validate(payload: JwtPayload) {
    return {
      email: payload.email,
      id: payload.id,
      idDevice: payload.idDevice ?? payload.id_device,
    };
  }
}
