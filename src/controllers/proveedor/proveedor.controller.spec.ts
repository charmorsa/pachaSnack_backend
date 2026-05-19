import { Test, TestingModule } from '@nestjs/testing';
import { ProveeController } from './proveedor.controller';
import { ProveeService } from '../../services/proveedor/proveedor.service';

describe('ProveeController', () => {
  let controller: ProveeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveeController],
      providers: [
        {
          provide: ProveeService,
          useValue: {
            create: jest.fn(),
            findId: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProveeController>(ProveeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
