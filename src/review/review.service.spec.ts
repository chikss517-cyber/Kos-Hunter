import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { beforeEach, describe, it, expect } from '@jest/globals';

void describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  void it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
