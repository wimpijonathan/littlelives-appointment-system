import Joi from 'joi';

export interface Holiday {
    date: string;
    description: string;
}

export interface CreateHolidayRequest {
    from_date: string;
    to_date: string;
    description: string;
}

export const CreateHolidayRequestSchema = Joi.object({
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    description: Joi.string().required()
});
