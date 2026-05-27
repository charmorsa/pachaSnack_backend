import { Controller, Get, Post, Put, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/usuarios/users.service';
import { JwtAuthGuard } from '../../helpers/jwt';
import { ValidarBodyPipe } from '../../middleware/validateBody.middleware';

@Controller('Usuarios')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(
    @Body(new ValidarBodyPipe())
    body: {
      name: string;
      pin: number;
      email: string;
      id_device: string;
      notifPush:string;
    },
  ) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Body(new ValidarBodyPipe())
    body: {
      name: string;
      pin: number;
      id_device: string;
      email: string;
    },
  ) {
    return this.service.update(body.name, body.pin, body.id_device, body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Query() query: { id: number }) {
    return this.service.delete(query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findId(@Query() query: { id: number }) {
    if (query.id) {
      return this.service.findId(Number(query.id));
    }
    return this.service.findAll();
  }
}

@Controller('login')
export class UsersLogin {
  constructor(private readonly service: UsersService) {}

  @Post()
  signin(
    @Body(new ValidarBodyPipe()) body: { pin: number; id_device: string },
  ) {
    return this.service.signin(body.pin, body.id_device);
  }

  @Put()
  recovery(
    @Body(new ValidarBodyPipe())
    body: {
      pin: number;
      id_device: string;
      email: string;
    },
  ) {
    return this.service.recovery(body.pin, body.id_device, body.email);
  }

  @Post('google')
  signinGoogle(
    @Body(new ValidarBodyPipe())
    body: {
      idToken: string;
      id_device: string;
    },
  ) {
    return this.service.signinGoogle(body.idToken, body.id_device);
  }
}
