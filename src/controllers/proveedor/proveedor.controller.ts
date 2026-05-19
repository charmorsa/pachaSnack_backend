import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProveeService } from '../../services/proveedor/proveedor.service';
import { JwtAuthGuard } from '../../helpers/jwt';

@UseGuards(JwtAuthGuard)
@Controller('Proveedores')
export class ProveeController {
  constructor(private readonly service: ProveeService) {}

  @Post()
  create(
    @Body()
    body: {
      nombreEmpresa: string;
      email: string;
      telefono: string;
      nombreContacto: string;
      emailContacto: string;
      direccion: string;
    },
  ) {
    return this.service.create(body);
  }

  @Delete()
  delete(@Query('id') id: number) {
    return this.service.delete(Number(id));
  }

  @Get()
  find(@Query('id') id?: number) {
    if (id) {
      return this.service.findId(Number(id));
    }

    return this.service.findAll();
  }
}
