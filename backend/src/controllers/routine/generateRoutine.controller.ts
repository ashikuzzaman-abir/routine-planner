import { Response, NextFunction } from 'express';
import generateTasks from '../../lib/generateTasks';

const generateTasksController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableTime = 10;
    // res.status(200).json({ message: 'Welcome to the server' });
    const newTasks =  generateTasks(availableTime);
    res.status(200).json(newTasks);
  } catch (err) {
    next(err);
  }
};

export default generateTasksController;
