import { Request, Response, Router } from 'express';
import { HolidayService } from 'src/services/holiday';
import { validateRequest } from 'src/libs/validator';
import { CreateHolidayRequest, CreateHolidayRequestSchema } from 'src/domains/holidays/holiday.types';

export class HolidayController {
    private readonly router: Router;

    constructor(private readonly holidayService: HolidayService) {
        this.router = Router();
        this.router.post('/', this.createHoliday.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    async createHoliday(req: Request, res: Response): Promise<Response> {
        try {
            const request = req.body as CreateHolidayRequest;
            validateRequest(request, CreateHolidayRequestSchema);

            const holiday = await this.holidayService.createHoliday(request);
            return res.status(200).json({
                message: 'Success!',
                data: holiday
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    }
}
