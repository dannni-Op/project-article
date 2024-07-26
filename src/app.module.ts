import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { ArticleCategory } from './modules/article-category/article-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOption } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './commons/common.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmModuleOption),
    ConfigModule.forRoot(),
    CommonModule,
    AuthModule,
    ArticleModule,
    UserModule,
    ArticleCategory,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
