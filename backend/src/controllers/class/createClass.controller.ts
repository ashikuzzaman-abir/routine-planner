import { Response, NextFunction } from 'express';
import Joi from 'joi';
import classModel from '../../models/class.model';

type BodyType = {
  name: string;
  description: string;
  isActive: boolean;
  date: Date;
  startingTime: string;
  endingTime: string;
  students: string[];
  teacher: string;
};

const createClass = async (req: any, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const newClass = new classModel({ ...req.body, createdBy: req.user._id });
    const savedClass = await newClass.save();
    res.status(201).json({ doc: savedClass });
  } catch (error) {
    next(error);
  }
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name should have a minimum length of 2',
      'string.max': 'Name should have a maximum length of 50',
    }),
    description: Joi.string().min(2).max(500).required().messages({
      'any.required': 'Description is required',
      'string.min': 'Description should have a minimum length of 2',
      'string.max': 'Description should have a maximum length of 500',
    }),
    isActive: Joi.boolean().required().messages({
      'any.required': 'Active status is required',
    }),
    date: Joi.date().required().messages({
      'any.required': 'Date is required',
    }),
    startingTime: Joi.string()
      .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .messages({
        'any.required':
          'Starting time is required and should be in HH:mm format',
      }),
    endingTime: Joi.string()
      .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .messages({
        'any.required': 'Ending time is required and should be in HH:mm format',
      }),
    students: Joi.array().items(Joi.string()).required().messages({
      'any.required': 'Students are required',
    }),
    teacher: Joi.string().required().messages({
      'any.required': 'Teacher is required',
    }),
  });
  return schema.validate(data);
};

export default createClass;
