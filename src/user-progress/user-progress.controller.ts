import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-progress')
@UseGuards(JwtAuthGuard)
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Post('learned')
  async markLearned(@Body() body: { itemId: string; itemType: 'HIRAGANA' | 'KATAKANA' }, @Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) throw new Error('User ID not found in request.');
    return this.userProgressService.markLearned(userId, body.itemId, body.itemType);
  }

  @Get('learned')
  async getLearned(@Req() req: any) {
    return this.userProgressService.getLearned(req.user?.sub);
  }
}
