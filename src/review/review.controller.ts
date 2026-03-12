import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@Body() body: any) {
    return this.reviewService.create(body);
  }

  @Get(':kosId')
  get(@Param('kosId') kosId: string) {
    return this.reviewService.getKosReviews(Number(kosId));
  }

  @Patch(':id/reply')
  reply(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.reviewService.reply(Number(id), body.reply);
  }
}
