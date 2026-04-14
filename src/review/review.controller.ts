import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() data: any) {
    return this.reviewService.create(data);
  }

  @Get(':kosId')
  findByKos(@Param('kosId') kosId: string) {
    return this.reviewService.findByKos(Number(kosId));
  }

  @Post(':id/reply')
  reply(@Param('id') id: string, @Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.reviewService.reply(Number(id), data.reply);
  }
}
