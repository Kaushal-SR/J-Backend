import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HiraganaModule } from './hiragana/hiragana.module';
import { AuthModule } from './auth/auth.module';
import { KatakanaModule } from './katakana/katakana.module';
import { UserProgressModule } from './user-progress/user-progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // 👈 makes env available everywhere
    }),
    PrismaModule,
    AuthModule,
     HiraganaModule,
    KatakanaModule,
    UserProgressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
