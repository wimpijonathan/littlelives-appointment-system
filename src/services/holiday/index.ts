/* eslint-disable no-await-in-loop, no-plusplus */

import { HolidayRepository } from 'src/repositories/holiday';
import { CreateHolidayRequest } from 'src/domains/holidays/holiday.types';
import { HolidayEntity } from 'src/domains/holidays/holiday.entity';
import dayjs from 'dayjs';
import { DATE_FORMAT, JAKARTA_TIMEZONE } from 'src/constants/time';

export class HolidayService {
    constructor(private readonly holidayRepository: HolidayRepository) {}

    public async createHoliday(request: CreateHolidayRequest): Promise<HolidayEntity[]> {
        if (
            !dayjs(request.from_date, DATE_FORMAT, true).isValid() ||
            !dayjs(request.to_date, DATE_FORMAT, true).isValid()
        ) {
            throw new Error('From date and To date must use YYYY-MM-DD format!');
        }

        const fromDate = dayjs(request.from_date, DATE_FORMAT).tz(JAKARTA_TIMEZONE);
        const toDate = dayjs(request.to_date, DATE_FORMAT).tz(JAKARTA_TIMEZONE);

        if (fromDate.isAfter(toDate)) {
            throw new Error('From date time must be before To date time!');
        }

        const dateDiff = fromDate.diff(toDate, 'day');
        const currentDate = fromDate;
        const result = [];

        for (let i = 0; i <= dateDiff; i++) {
            const dateString = currentDate.add(i, 'day').format(DATE_FORMAT);
            const holiday = await this.holidayRepository.createHoliday({
                date: dateString,
                description: request.description
            });
            result.push(holiday);
        }

        return result;
    }
}
