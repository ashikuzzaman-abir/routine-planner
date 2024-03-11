import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
type BodyType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  preference: {
    availableStudyTime: string;
    learningObjective: string;
  };
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const { password, ...rest } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...rest, password: hasedPassword });
    user.role = 'student';
    const savedUser = await user.save();
    const { password: pass, ...userWithoutPassword } = savedUser.toObject();
    const token = savedUser.generateAuthToken();
    res.status(201).json({ user: userWithoutPassword, token: token });
  } catch (error: any) {
    next(error);
  }
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
    phone: Joi.string().messages({}),
    password: Joi.string().min(8).max(1024).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot be more than 1024 characters',
    }),
    isActive: Joi.boolean().messages({
      'any.boolean': 'Active must be a boolean',
    }),
    preference: Joi.object({
      availableStudyTime: Joi.number().required().messages({
        'any.required': 'Available study time is required',
      }),
      learningObjective: Joi.string().required().messages({
        'any.required': 'Learning objective is required',
      }),
    }),
  });
  return schema.validate(data);
};

export default register;
