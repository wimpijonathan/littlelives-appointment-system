import express, { RequestHandler } from 'express';
import { init } from 'src/init';
import bodyParser from 'body-parser';

export const initializeApp = async (): Promise<express.Application> => {
    const { rootController, scheduleController, holidayController, appointmentController } = await init();
    const app = express();

    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }) as RequestHandler);
    app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);

    app.use('/', rootController.getRouter());
    app.use('/api/v1/schedule', scheduleController.getRouter());
    app.use('/api/v1/appointment', appointmentController.getRouter());
    app.use('/api/v1/holiday', holidayController.getRouter());

    return app;
};
