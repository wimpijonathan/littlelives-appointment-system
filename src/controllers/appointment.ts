import { Request, Response, Router } from 'express';
import { AppointmentService } from 'src/services/appointment';
import {
    CancelAppointmentRequest,
    CancelAppointmentRequestSchema,
    CreateAppointmentRequest,
    CreateAppointmentRequestSchema
} from 'src/domains/appointment/appointment.types';
import { validateRequest } from 'src/libs/validator';

export class AppointmentController {
    private readonly router: Router;

    constructor(private readonly appointmentService: AppointmentService) {
        this.router = Router();
        this.router.post('/', this.createAppointment.bind(this));
        this.router.post('/cancel', this.cancelAppointment.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    async cancelAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const request = req.body as CancelAppointmentRequest;
            validateRequest(request, CancelAppointmentRequestSchema);

            await this.appointmentService.cancelAppointment(request);
            return res.status(200).json({
                message: 'Success!'
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }

    async createAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const request = req.body as CreateAppointmentRequest;
            validateRequest(request, CreateAppointmentRequestSchema);

            const appointment = await this.appointmentService.createAppointment(request);
            return res.status(200).json({
                message: 'Success!',
                data: appointment
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }
}
