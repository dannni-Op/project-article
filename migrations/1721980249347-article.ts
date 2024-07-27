import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Article1721980249347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
            onUpdate: 'current_timestamp',
          },
          {
            name: 'authorId',
            type: 'int',
          },
          {
            name: 'categoryId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'articles',
      new TableForeignKey({
        name: 'FK_article_authorId',
        columnNames: ['authorId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'articles',
      new TableForeignKey({
        name: 'FK_article_categoryId',
        columnNames: ['categoryId'],
        referencedTableName: 'article_categories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
    // await queryRunner.dropForeignKey('articles', 'FK_article_categories_name');
    // await queryRunner.dropForeignKey('articles', 'FK_article_author');
  }
}
