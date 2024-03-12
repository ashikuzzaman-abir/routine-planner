import { Response, NextFunction } from 'express';
import User from '../../models/user.model';

const deleteUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.deleteOne({ _id: userId });
    if (!deleteUser)
      return res.status(400).json({ message: 'user not deleted' });
    return res.status(200).json({ message: 'user deleted' });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
