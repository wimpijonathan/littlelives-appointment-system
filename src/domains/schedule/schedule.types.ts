import Joi from 'joi';

export interface Schedule {
    date: string;
    time: string;
    available_slot: number;
}

export interface CreateScheduleRequest {
    from_date: string;
    to_date: string;
    operation_start_hour: number;
    operation_end_hour: number;
    duration_in_minutes: number;
    available_slots: number;
}

export const CreateScheduleRequestSchema = Joi.object({
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    operation_start_hour: Joi.number().required().min(9).max(17),
    operation_end_hour: Joi.number().required().min(10).max(18),
    duration_in_minutes: Joi.number().required().min(5).max(30),
    available_slots: Joi.number().required().min(1).max(5)
});

export interface GetScheduleRequest {
    date: string;
}

export const GetScheduleRequestSchema = Joi.object({
    date: Joi.string().required()
});
