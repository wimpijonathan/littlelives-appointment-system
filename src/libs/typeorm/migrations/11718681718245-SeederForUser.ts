// eslint-disable-next-line filenames/match-regex
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederForUser11718681718245 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "user" (id, name) VALUES ('user-test-1', 'testing_user1'),('user-test-2', 'testing_user2'),('user-test-3', 'testing_user3'),('user-test-4', 'testing_user4'),('user-test-5', 'testing_user5')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users"`);
    }
}
