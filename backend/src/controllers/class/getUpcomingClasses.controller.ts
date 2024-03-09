import { Response, NextFunction } from 'express';
import classModel from '../../models/class.model';

const getUpcomingClasses = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    const classes = await classModel
      .find({
        $and: [{ date: { $gte: today } }],
        isActive: true,
        students: { $in: req.user._id },
      })
      .select('-students')
      .populate({
        path: 'teacher',
        model: 'User',
        select: '-password',
      } as any);

    res.status(200).json({ doc: classes });
  } catch (error: any) {
    next(error);
  }
};

export default getUpcomingClasses;
