import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    token: string,
}

export { AuthenticatedRequest }