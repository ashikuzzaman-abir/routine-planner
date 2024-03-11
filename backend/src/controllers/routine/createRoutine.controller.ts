import { Response, NextFunction } from 'express';
import generateTasks from '../../lib/generateTasks';
import Joi from 'joi';
import { Schema } from 'mongoose';
import routineModel from '../../models/routine.model';

type BodyType = {
  name: string;
  description: string;
  isActive: boolean;
  // user: Schema.Types.ObjectId;
  // // tasks: taskSchema[];
  // tasks: Schema.Types.Array;
};

const createRoutine = async (req: any, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const userId = req.user._id;
    const availableTime = req.user.preference.availableStudyTime;

    // res.status(200).json({ message: 'Welcome to the server' });
    const newTasks = generateTasks(availableTime);
    const routine = new routineModel({
      ...req.body,
      user: userId,
      tasks: newTasks,
    });
    const savedRoutine = await routine.save();
    res.status(201).json({ doc: savedRoutine });
  } catch (err) {
    next(err);
  }
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    description: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Description is required',
      'string.min': 'Description must be at least 2 characters long',
    }),
    isActive: Joi.boolean().messages({
      'any.boolean': 'Active must be a boolean',
    }),
  });
  return schema.validate(data);
};

export default createRoutine;
