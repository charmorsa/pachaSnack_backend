import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProducService } from '../../services/productos/productos.service';
import { JwtAuthGuard } from '../../helpers/jwt';

@UseGuards(JwtAuthGuard)
@Controller('Productos')
export class ProductoController {
  constructor(private readonly service: ProducService) {}

  @Post()
  create(
    @Body()
    body: {
      descripcion: string;
      tamaño: string;
      id_proveedor: number;
      precio: number;
      cantidad: number;
    },
  ) {
    return this.service.create(body);
  }

  @Put('/Actualizar')
  update(@Body() body: { precio: number; cantidad: number; id: number }) {
    return this.service.update(body.precio, body.cantidad, body.id);
  }

  @Put()
  edit(
    @Body()
    body: {
      id: number;
      descripcion: string;
      id_proveedor: number;
      tamaño: string;
    },
  ) {
    return this.service.edit(
      body.id,
      body.descripcion,
      body.id_proveedor,
      body.tamaño,
    );
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
