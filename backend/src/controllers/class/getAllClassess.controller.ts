import { Response, NextFunction } from 'express';
import classModel from '../../models/class.model';

const getAllClasses = async (req: any, res: Response, next: NextFunction) => {
  try {
    const classes = await classModel
      .find()
      .populate({
        path: 'teacher',
        model: 'User',
        select: '-password',
      } as any)
      .populate({
        path: 'students',
        model: 'User',
        select: '-password',
      } as any)
      .populate({
        path: 'attendies',
        model: 'User',
        select: '-password',
      } as any);
    res.status(200).json({ doc: classes });
  } catch (error: any) {
    next(error);
  }
};

export default getAllClasses;
