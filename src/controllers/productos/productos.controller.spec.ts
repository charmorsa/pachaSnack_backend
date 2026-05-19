import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './productos.controller';
import { ProducService } from '../../services/productos/productos.service';

describe('ProductoController', () => {
  let controller: ProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [
        {
          provide: ProducService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            edit: jest.fn(),
            findId: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductoController>(ProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
