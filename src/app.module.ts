import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/usuarios/users.module';
import { ProductoModule } from './models/productos/productos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProveedorModule } from './models/proveedor/proveedor.module';
import { env } from './config/env';

const IS_PRODUCTION = env.nodeEnv === 'production';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: env.db.host,
      port: env.db.port,
      username: env.db.user,
      password: env.db.pass,
      database: env.db.name,
      autoLoadEntities: true,
      // En producción no se sincroniza el esquema automáticamente para evitar cambios accidentales en la base.
      synchronize: !IS_PRODUCTION,
      logging: !IS_PRODUCTION,
      // synchronize: false,          // PROD
      // migrationsRun: true,         // PROD
      retryAttempts: 10,
      retryDelay: 3000,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    UsersModule,
    ProductoModule,
    ProveedorModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
