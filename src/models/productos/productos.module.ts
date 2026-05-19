import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos.entity';
import { ProducService } from '../../services/productos/productos.service';
import { ProductoController } from '../../controllers/productos/productos.controller';
import { Proveedor } from '../proveedor/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Proveedor])],
  providers: [ProducService],
  controllers: [ProductoController],
})
export class ProductoModule {}
