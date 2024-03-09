import { Request, Response, NextFunction } from 'express';
import classModel from '../../models/class.model';

const attendClass = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id: classId } = req.params;
    const { _id: userId } = req.user;
    const selectClass = await classModel.findById(classId);
    if (!selectClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    if (!selectClass.students.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'You are not enrolled in this class' });
    }
    if (selectClass.attendies.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'You have already attended this class' });
    }
    const currentDate = new Date();
    const selecterdDate = new Date(selectClass.date).toDateString();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const startingTime = selectClass.startingTime;
    const endingTime = selectClass.endingTime;

    if (
      currentDate.toDateString() !== selecterdDate ||
      currentTime < startingTime ||
      currentTime > endingTime
    ) {
      // return res.status(400).json({
      //   selecterdDate,
      //   currentDate: currentDate.toDateString(),
      // });
      return res
        .status(400)
        .json({ message: 'Class is not currently available' });
    }
    selectClass.attendies.push(userId);
    const updatedAttendence = await selectClass.save();
    return res.status(200).json({ message: 'Class attended successfully' });
  } catch (error: any) {
    next(error);
  }
};

export default attendClass;
