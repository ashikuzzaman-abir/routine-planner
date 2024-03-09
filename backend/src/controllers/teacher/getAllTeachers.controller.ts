import { Response, NextFunction } from 'express';
import User from '../../models/user.model';

const getAllTeachers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.status(200).json({ doc: teachers });
  } catch (error: any) {
    next(error);
  }
};

export default getAllTeachers;
