import { Response, NextFunction } from 'express';

const role =
  (roles: string[]) => (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
export default role;
