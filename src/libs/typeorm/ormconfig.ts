/* eslint-disable no-process-env */

import { ConnectionOptions } from 'typeorm';
import { entities } from 'src/libs/typeorm/entities';
import { migrations } from 'src/libs/typeorm/migrations';

export const generateOrmConfig = (additionalConfig?: Partial<ConnectionOptions>): ConnectionOptions => {
    return {
        applicationName: 'littlelives',
        logging: true,
        subscribers: [],
        installExtensions: false,
        extra: {
            connectionTimeoutMillis: 10000,
            idleTimeoutMillis: 60000,
            statement_timeout: 360000, // 6 minutes
            max: 10
        },
        name: 'default',
        type: 'postgres',
        database: process.env.PGDATABASE || 'test',
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT || '54321',
        username: process.env.PGUSER || 'test',
        password: process.env.PGPASSWORD || 'test',
        entities,
        migrations,
        cli: {
            entitiesDir: 'src/libs/typeorm/entities',
            migrationsDir: 'src/libs/typeorm/migrations'
        },
        ...additionalConfig
    } as ConnectionOptions;
};
