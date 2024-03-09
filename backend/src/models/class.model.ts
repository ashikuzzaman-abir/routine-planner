import mongoose, { Document, Schema } from 'mongoose';

export type ClassType = Document & {
  name: string;
  description: string;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  date: Date;
  startingTime: string;
  endingTime: string;
  students: Schema.Types.ObjectId[];
  teacher: Schema.Types.ObjectId;
  attendies: Schema.Types.ObjectId[];
};

const schema = new Schema<ClassType>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startingTime: {
      type: String,
      required: true,
    },
    endingTime: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ClassType>('Class', schema);
