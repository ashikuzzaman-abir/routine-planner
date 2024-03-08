import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
type BodyType = {
  email: string;
  password: string;
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid email or password' });
    const { password: pass, ...userWithoutPassword } = user.toObject();
    const token = user.generateAuthToken();
    res.status(201).json({ user: userWithoutPassword, token: token });
  } catch (error: any) {
    next(error);
  }
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().min(8).max(1024).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot be more than 1024 characters',
    }),
  });
  return schema.validate(data);
};

export default loginController;
