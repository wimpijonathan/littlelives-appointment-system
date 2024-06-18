import { EntityRepository, Repository } from 'typeorm';
import { AppointmentEntity } from 'src/domains/appointment/appointment.entity';
import { get } from 'lodash';
import { logger } from 'src/libs/logger';
import { Appointment } from 'src/domains/appointment/appointment.types';

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {
    async deleteAppointmentById(id: string): Promise<void> {
        try {
            await this.createQueryBuilder('deleteAppointmentById')
                .delete()
                .from(AppointmentEntity)
                .where('id = :id', { id })
                .execute();
        } catch (error) {
            logger.error('Error when deleting appointment...', error);
            throw new Error(error);
        }
    }

    async findOneBy(query: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
        try {
            return await this.findOneOrFail(query);
        } catch (error) {
            logger.error('Error when finding appointment...', error);
            throw new Error(error);
        }
    }

    async createAppointment(appointment: Appointment): Promise<AppointmentEntity> {
        try {
            const result = await this.createQueryBuilder('createAppointment')
                .insert()
                .into(AppointmentEntity)
                .values({ ...appointment })
                .returning('*') // .save or .create method only returns uninputted value, so we need this line
                .execute();

            return get(result, 'raw[0]', {}) as AppointmentEntity;
        } catch (error) {
            logger.error('Error when creating appointment...', error);
            throw new Error(error);
        }
    }
}
