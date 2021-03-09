import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [new transports.Console()]
});
