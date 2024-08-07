import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { Article } from 'src/entities/article.entity';
import { User } from 'src/entities/user.entity';

export const typeOrmModuleOption: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    // entities: [__dirname + '/../entities/**/*.entity.{ts, js}'],
    entities: [User, Article, ArticleCategory],
    synchronize: false,
    logging: ['query', 'error'],
  }),
  inject: [ConfigService],
};
