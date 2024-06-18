import { EntityRepository, Repository } from 'typeorm';
import { ScheduleEntity } from 'src/domains/schedule/schedule.entity';
import { get } from 'lodash';
import { logger } from 'src/libs/logger';
import { Schedule } from 'src/domains/schedule/schedule.types';

@EntityRepository(ScheduleEntity)
export class ScheduleRepository extends Repository<ScheduleEntity> {
    async createSchedule(schedule: Schedule): Promise<ScheduleEntity> {
        try {
            const result = await this.createQueryBuilder('createSchedule')
                .insert()
                .into(ScheduleEntity)
                .values({ ...schedule })
                .returning('*') // .save or .create method only returns uninputted value, so we need this line
                .execute();

            return get(result, 'raw[0]', {}) as ScheduleEntity;
        } catch (error) {
            logger.error('Error when creating schedule...', error);
            throw new Error(error);
        }
    }

    async findOneBy(query: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        try {
            return await this.findOneOrFail(query);
        } catch (error) {
            logger.error('Error when finding schedule...', error);
            throw new Error(error);
        }
    }

    async findAllBy(query: Partial<ScheduleEntity>): Promise<ScheduleEntity[]> {
        try {
            return await this.find(query);
        } catch (error) {
            logger.error('Error when finding schedule...', error);
            throw new Error(error);
        }
    }

    async updateScheduleAvailableSlot(id: string, slot: number): Promise<void> {
        try {
            await this.createQueryBuilder('updateScheduleAvailableSlot')
                .update(ScheduleEntity)
                .set({
                    available_slot: slot
                })
                .where('id = :id', { id })
                .returning('*')
                .execute();
        } catch (error) {
            logger.error('Error when updating schedule...', error);
            throw new Error(error);
        }
    }
}
