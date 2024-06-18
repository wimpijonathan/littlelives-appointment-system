import { AppointmentRepository } from 'src/repositories/appointment';
import { CancelAppointmentRequest, CreateAppointmentRequest } from 'src/domains/appointment/appointment.types';
import { UserRepository } from 'src/repositories/user';
import { ScheduleRepository } from 'src/repositories/schedule';
import { AppointmentEntity } from 'src/domains/appointment/appointment.entity';
import { EntityManager, getConnection } from 'typeorm';

export class AppointmentService {
    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly userRepository: UserRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) {}

    public async cancelAppointment(request: CancelAppointmentRequest): Promise<void> {
        const appointment = await this.appointmentRepository.findOneBy({
            id: request.appointment_id
        });

        if (!appointment) {
            throw new Error('Appointment not exists!');
        }

        const schedule = await this.scheduleRepository.findOneBy({
            id: appointment.schedule_id
        });

        return getConnection().transaction(async (txnManager: EntityManager) => {
            await txnManager.getCustomRepository(AppointmentRepository).deleteAppointmentById(request.appointment_id);

            await txnManager
                .getCustomRepository(ScheduleRepository)
                .updateScheduleAvailableSlot(schedule.id, schedule.available_slot + 1);
        });
    }

    public async createAppointment(request: CreateAppointmentRequest): Promise<AppointmentEntity> {
        const user = await this.userRepository.findOneBy({
            id: request.user_id
        });

        const schedule = await this.scheduleRepository.findOneBy({
            id: request.schedule_id
        });

        if (!user) {
            throw new Error('User not exists!');
        }
        if (!schedule) {
            throw new Error('Schedule not exists!');
        }
        if (schedule.available_slot === 0) {
            throw new Error('Slot is full already for this schedule!');
        }

        return getConnection().transaction(async (txnManager: EntityManager) => {
            const appointment = await txnManager.getCustomRepository(AppointmentRepository).createAppointment({
                user_id: request.user_id,
                schedule_id: request.schedule_id
            });

            await txnManager
                .getCustomRepository(ScheduleRepository)
                .updateScheduleAvailableSlot(request.schedule_id, schedule.available_slot - 1);

            return appointment;
        });
    }
}
