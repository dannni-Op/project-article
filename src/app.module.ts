import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { ArticleCategoryModule } from './modules/article-category/article-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOption } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './commons/common.module';
import { AtStrategy } from './stategies/at.strategy';
import { RtStrategy } from './stategies/rt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './commons/guards/at.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmModuleOption),
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    AuthModule,
    ArticleModule,
    UserModule,
    ArticleCategoryModule,
  ],
  controllers: [],
  providers: [
    AtStrategy,
    RtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
