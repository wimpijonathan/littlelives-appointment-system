import '../module-alias';
import express from 'express';
import { logger } from 'src/libs/logger';
import * as http from 'http';
import { initializeApp } from 'src/server/app';
import _ from 'lodash';
import gracefulShutdown from 'http-graceful-shutdown';

let app: express.Application;
let server: http.Server;
const port = 3000;

// Start the server
(async () => {
    try {
        app = await initializeApp();
        server = app.listen(port, () => {
            logger.info(`Started express server with port ${port}...`);
        });
    } catch (err) {
        logger.error(`Error caught when running server`, err);
    } finally {
        if (_.isObject(app) && _.isObject(server)) {
            gracefulShutdown(server, { forceExit: false });
            process.on('unhandledRejection', (reason: any) => {
                logger.warn('Encountered unhandled rejection', { reason_object: reason });
                process.exit(1);
            });

            process.on('uncaughtException', (err: Error) => {
                logger.error('Encountered uncaught exception', err);
                process.exit(1);
            });

            process.on('warning', (warning: Error) => {
                logger.warn('encountered warning', {
                    warning_object: warning
                });
            });
        } else {
            process.exit(1);
        }
    }
})();
