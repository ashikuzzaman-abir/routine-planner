import { Response, NextFunction } from 'express';
import User from '../../models/user.model';

const getAllStudents = async (req: any, res: Response, next: NextFunction) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json({ doc: students });
  } catch (error: any) {
    next(error);
  }
};

export default getAllStudents;
