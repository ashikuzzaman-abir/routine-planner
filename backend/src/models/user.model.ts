import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';

export type UserType = Document & {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  role: mongoose.Schema.Types.ObjectId;
  generateAuthToken: () => string;
};

const schema = new Schema<UserType>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [1024, 'Password cannot be more than 1024 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.generateAuthToken = function (this: UserType) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model<UserType>('User', schema);
export default User;
