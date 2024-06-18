/* eslint-disable no-await-in-loop, no-plusplus */

import { ScheduleRepository } from 'src/repositories/schedule';
import { CreateScheduleRequest, GetScheduleRequest } from 'src/domains/schedule/schedule.types';
import { ScheduleEntity } from 'src/domains/schedule/schedule.entity';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    DATE_FORMAT,
    JAKARTA_TIMEZONE,
    UNAVAILABLE_END_HOUR,
    UNAVAILABLE_START_HOUR,
    WEEKEND_DAYS
} from 'src/constants/time';
import { HolidayRepository } from 'src/repositories/holiday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export class ScheduleService {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly holidayRepository: HolidayRepository
    ) {}

    public async getSchedule(request: GetScheduleRequest): Promise<ScheduleEntity[]> {
        if (!dayjs(request.date, DATE_FORMAT, true).isValid()) {
            throw new Error('Date must use YYYY-MM-DD format!');
        }

        return this.scheduleRepository.findAllBy({
            date: request.date
        });
    }

    public async createSchedule(request: CreateScheduleRequest): Promise<ScheduleEntity[]> {
        if (request.duration_in_minutes % 5 !== 0) {
            throw new Error('Duration must be 5/10/15/20/25/30 minutes!');
        }

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

        if (request.operation_start_hour > request.operation_end_hour) {
            throw new Error('Operation start hour must be before Operation end hour!');
        }

        const dateDiff = Math.abs(fromDate.diff(toDate, 'day'));

        const currentDate = fromDate;
        const result = [];

        for (let i = 0; i <= dateDiff; i++) {
            const dateString = currentDate.add(i, 'day').format(DATE_FORMAT);

            const holiday = await this.holidayRepository.findAllBy({
                date: dateString
            });

            // Skip inserting schedule if it's holiday
            if (holiday.length >= 1) {
                continue;
            }

            // Skip inserting schedule if it's weekend
            if (WEEKEND_DAYS.includes(currentDate.add(i, 'day').day())) {
                continue;
            }

            for (let j = request.operation_start_hour; j <= request.operation_end_hour; j++) {
                // Skip inserting schedule if it's unavailable hours
                if (j >= UNAVAILABLE_START_HOUR && j <= UNAVAILABLE_END_HOUR) {
                    continue;
                }

                for (let k = 0; k < 60; k += request.duration_in_minutes) {
                    const timeString = `${j.toString().padStart(2, '0')}:${k.toString().padStart(2, '0')}`;

                    const schedule = await this.scheduleRepository.createSchedule({
                        date: dateString,
                        time: timeString,
                        available_slot: request.available_slots
                    });
                    result.push(schedule);
                }
            }
        }

        return result;
    }
}
