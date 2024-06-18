/* eslint-disable no-process-env */

import { RootController } from 'src/controllers/root';
import { initializeDBConnection } from 'src/libs/typeorm/connect';
import { generateOrmConfig } from 'src/libs/typeorm/ormconfig';
import { getConnection, getCustomRepository } from 'typeorm';
import { logger } from 'src/libs/logger';
import { onShutdown } from 'node-graceful-shutdown';
import { ScheduleController } from 'src/controllers/schedule';
import { AppointmentController } from 'src/controllers/appointment';
import { HolidayController } from 'src/controllers/holiday';
import { ScheduleRepository } from 'src/repositories/schedule';
import { AppointmentRepository } from 'src/repositories/appointment';
import { HolidayRepository } from 'src/repositories/holiday';
import { ScheduleService } from 'src/services/schedule';
import { AppointmentService } from 'src/services/appointment';
import { HolidayService } from 'src/services/holiday';
import { UserRepository } from 'src/repositories/user';

export interface DependencyContainer {
    rootController: RootController;
    scheduleController: ScheduleController;
    appointmentController: AppointmentController;
    holidayController: HolidayController;
}

export const init = async (): Promise<DependencyContainer> => {
    const dbConfig = generateOrmConfig();
    await initializeDBConnection(dbConfig);

    const scheduleRepository: ScheduleRepository = getCustomRepository(ScheduleRepository);
    const appointmentRepository: AppointmentRepository = getCustomRepository(AppointmentRepository);
    const holidayRepository: HolidayRepository = getCustomRepository(HolidayRepository);
    const userRepository: UserRepository = getCustomRepository(UserRepository);

    const scheduleService: ScheduleService = new ScheduleService(scheduleRepository, holidayRepository);
    const appointmentService: AppointmentService = new AppointmentService(
        appointmentRepository,
        userRepository,
        scheduleRepository
    );
    const holidayService: HolidayService = new HolidayService(holidayRepository);

    const rootController = new RootController();
    const scheduleController = new ScheduleController(scheduleService);
    const appointmentController = new AppointmentController(appointmentService);
    const holidayController = new HolidayController(holidayService);

    onShutdown(async () => {
        logger.info('Closing connections');
        await getConnection().close();
        logger.info('Done closing DB connection');
    });

    return {
        rootController,
        scheduleController,
        appointmentController,
        holidayController
    };
};
