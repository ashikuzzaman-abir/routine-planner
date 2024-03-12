import routineModel from './../../models/routine.model';
import { NextFunction, Request, Response } from 'express';

const getAllRoutines = async (req: any, res: Response, next: NextFunction) => {
  try {
    const routines = await routineModel.find({
      user: req.user._id,
      isActive: true,
    });
    return res.status(200).json({ doc: routines });
  } catch (error) {
    next(error);
  }
};

export default getAllRoutines;
