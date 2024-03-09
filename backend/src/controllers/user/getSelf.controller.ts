import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model';

const getSelf = async (req: any, res: Response, next: NextFunction) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select('-password');
    res.status(200).json({ doc: user.toObject() });
  } catch (error: any) {
    next(error);
  }
};

export default getSelf;
