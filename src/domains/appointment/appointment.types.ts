import Joi from 'joi';

export interface Appointment {
    schedule_id: string;
    user_id: string;
}

export interface CreateAppointmentRequest {
    schedule_id: string;
    user_id: string;
}

export interface CancelAppointmentRequest {
    appointment_id: string;
}

export const CreateAppointmentRequestSchema = Joi.object({
    schedule_id: Joi.string().required(),
    user_id: Joi.string().required()
});

export const CancelAppointmentRequestSchema = Joi.object({
    appointment_id: Joi.string().required()
});
