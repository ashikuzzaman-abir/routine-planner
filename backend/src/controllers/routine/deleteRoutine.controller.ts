import { Response, NextFunction } from 'express';
import routineModel from '../../models/routine.model';

const deleteRoutine = async (req: any, res: Response, next: NextFunction) => {
  try {
    const routineId = req.params.id;
    const deletedRoutine = await routineModel.deleteOne({ _id: routineId });
    if (!deleteRoutine)
      return res.status(400).json({ message: 'Cannot delete the routine' });
    return res.status(200).json({ message: 'Routine Deleted' });
  } catch (err) {
    next(err);
  }
};

export default deleteRoutine;
