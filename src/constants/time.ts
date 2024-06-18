/* eslint-disable no-process-env */

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const JAKARTA_TIMEZONE = 'Asia/Jakarta';

export const UNAVAILABLE_START_HOUR = Number(process.env.UNAVAILABLE_START_HOUR) || 11;
export const UNAVAILABLE_END_HOUR = Number(process.env.UNAVAILABLE_END_HOUR) || 12;

export const WEEKEND_DAYS = [0, 6];
