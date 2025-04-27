import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const {statusCode} = res;
    const apiCall = `${method} ${originalUrl}`;

    logger.info('Incoming API Request', { apiCall, statusCode });

    next();
}
