import { Test, TestingModule } from '@nestjs/testing';
import { KosService } from './kos.service';
import { beforeEach, describe, it, expect } from '@jest/globals';

void describe('KosService', () => {
  let service: KosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KosService],
    }).compile();

    service = module.get<KosService>(KosService);
  });

  void it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
