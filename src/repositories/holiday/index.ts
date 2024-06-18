import { EntityRepository, Repository } from 'typeorm';
import { HolidayEntity } from 'src/domains/holidays/holiday.entity';
import { get } from 'lodash';
import { logger } from 'src/libs/logger';
import { Holiday } from 'src/domains/holidays/holiday.types';

@EntityRepository(HolidayEntity)
export class HolidayRepository extends Repository<HolidayEntity> {
    async findAllBy(query: Partial<HolidayEntity>): Promise<HolidayEntity[]> {
        try {
            return await this.find(query);
        } catch (error) {
            logger.error('Error when finding holiday...', error);
            throw new Error(error);
        }
    }

    async createHoliday(holiday: Holiday): Promise<HolidayEntity> {
        try {
            const result = await this.createQueryBuilder('createHoliday')
                .insert()
                .into(HolidayEntity)
                .values({ ...holiday })
                .returning('*') // .save or .create method only returns uninputted value, so we need this line
                .execute();

            return get(result, 'raw[0]', {}) as HolidayEntity;
        } catch (error) {
            logger.error('Error when creating holiday...', error);
            throw new Error(error);
        }
    }
}
