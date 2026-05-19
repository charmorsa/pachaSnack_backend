import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { ProveeService } from '../../services/proveedor/proveedor.service';
import { ProveeController } from '../../controllers/proveedor/proveedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])],
  providers: [ProveeService],
  controllers: [ProveeController],
})
export class ProveedorModule {}
