// eslint-disable-next-line filenames/match-regex
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAllTables11718681718244 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "schedule" ("id" character varying NOT NULL DEFAULT concat('sched-', gen_random_uuid()), "date" character varying NOT NULL, "time" character varying NOT NULL, "available_slot" integer NOT NULL, "created" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), "updated" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), CONSTRAINT "PK_463ed35f32b733386261ab7d7fc" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "holiday" ("id" character varying NOT NULL DEFAULT concat('hol-', gen_random_uuid()), "date" character varying NOT NULL, "description" character varying NOT NULL,"created" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), "updated" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), CONSTRAINT "PK_463ed35f32b733386261ab7d7fd" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "appointment" ("id" character varying NOT NULL DEFAULT concat('app-', gen_random_uuid()), "schedule_id" character varying NOT NULL, "user_id" character varying NOT NULL, "created" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), "updated" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), CONSTRAINT "PK_463ed35f32b733386261ab7d7fe" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" character varying NOT NULL DEFAULT concat('user-', gen_random_uuid()), "name" character varying NOT NULL, "created" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), "updated" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc', now()), CONSTRAINT "PK_463ed35f32b733386261ab7d7ff" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(`CREATE INDEX "IDX_Schedule_Date" ON "schedule" ("date")`);
        await queryRunner.query(`CREATE INDEX "IDX_Holiday_Date" ON "schedule" ("date")`);
        await queryRunner.query(`CREATE INDEX "IDX_Appointment_User_ID" ON "appointment" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_Appointment_Schedule_ID" ON "appointment" ("schedule_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_User_Created" ON "user" ("created")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_Schedule_Date_Time" ON "schedule" ("date", "time")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_Holiday_Date_Time" ON "holiday" ("date")`);
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_Appointment_Schedule_ID_User_ID" ON "appointment" ("schedule_id", "user_id")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_Schedule_Date"`);
        await queryRunner.query(`DROP INDEX "IDX_Holiday_Date"`);
        await queryRunner.query(`DROP INDEX "IDX_Appointment_User_ID"`);
        await queryRunner.query(`DROP INDEX "IDX_Appointment_Schedule_ID"`);
        await queryRunner.query(`DROP INDEX "IDX_User_Created"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "holiday"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
    }
}
