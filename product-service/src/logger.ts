import { createLogger, format, transports } from 'winston';

const serviceName = process.env.SERVICE_NAME || 'Product-Service';

const logger = createLogger({
    level: 'silly', // sab levels allow karna
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, ...meta }) => {
            const apiCall = meta.apiCall || 'N/A';
            const statusCode = meta.statusCode || '000';
            return `[${serviceName}] [${timestamp}] [${level.toUpperCase()}] [${apiCall}] [${statusCode}] ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ],
});

export default logger;
