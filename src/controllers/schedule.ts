import { Router, Request, Response } from 'express';
import { ScheduleService } from 'src/services/schedule';
import {
    CreateScheduleRequest,
    CreateScheduleRequestSchema,
    GetScheduleRequest,
    GetScheduleRequestSchema
} from 'src/domains/schedule/schedule.types';
import { validateRequest } from 'src/libs/validator';

export class ScheduleController {
    private readonly router: Router;

    constructor(private readonly scheduleService: ScheduleService) {
        this.router = Router();
        this.router.post('/', this.createSchedule.bind(this));
        this.router.get('/', this.getSchedule.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    async getSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const request = req.body as GetScheduleRequest;
            validateRequest(request, GetScheduleRequestSchema);

            const schedule = await this.scheduleService.getSchedule(request);
            return res.status(200).json({
                message: 'Success!',
                data: schedule
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }

    async createSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const request = req.body as CreateScheduleRequest;
            validateRequest(request, CreateScheduleRequestSchema);

            const schedule = await this.scheduleService.createSchedule(request);
            return res.status(200).json({
                message: 'Success!',
                data: schedule
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }
}
