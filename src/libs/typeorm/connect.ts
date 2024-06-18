import { ConnectionOptions, Connection, createConnection, getConnection } from 'typeorm';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import { Pool } from 'pg';
import { logger } from 'src/libs/logger';
import { sleep } from 'src/libs/sleep';

// Handles unstable/intermitten connection lost to DB
const connectionGuard = (connection: Connection) => {
    // Access underlying pg driver
    if (connection.driver instanceof PostgresDriver) {
        const pool = connection.driver.master as Pool;

        // Add handler on pool error event
        pool.on('error', async (err) => {
            logger.error('Connection pool erring out, Reconnecting...', err);
            try {
                await connection.close();
            } catch (innerErr) {
                logger.error('Failed to close connection', innerErr);
            }

            while (!connection.isConnected) {
                try {
                    await connection.connect(); // eslint-disable-line
                    logger.info('Reconnected DB');
                } catch (error) {
                    logger.error('Reconnect Error', error);
                }

                if (!connection.isConnected) {
                    // Throttle retry
                    await sleep(500); // eslint-disable-line
                }
            }
        });
    }
};

export const initializeDBConnection = async (ormConfig: ConnectionOptions): Promise<Connection> => {
    let connection: Connection;
    let isConnected = false;

    logger.info(`Connecting to ${ormConfig.name} DB...`);
    while (!isConnected) {
        try {
            connection = await createConnection(ormConfig); // eslint-disable-line
            isConnected = connection.isConnected;
        } catch (error) {
            logger.error(error, `${ormConfig.name} createConnection Error`);
        }

        if (!isConnected) {
            // Throttle retry
            await sleep(500); // eslint-disable-line
        }
    }

    logger.info(`Connected ${ormConfig.name} to DB`);
    connectionGuard(connection);

    // For testing purpose only
    logger.info(`Running migrations...`);
    await getConnection().runMigrations({
        transaction: 'all'
    });

    return connection;
};
