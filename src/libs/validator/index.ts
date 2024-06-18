import { ObjectSchema } from 'joi';
import { logger } from 'src/libs/logger';

export const validateRequest = (request: object, schema: ObjectSchema) => {
    const { error } = schema.validate(request);
    if (error) {
        logger.error('Validation error!', error);
        throw new Error(error.message);
    }
};
