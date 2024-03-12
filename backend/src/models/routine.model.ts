import mongoose, { Document, Schema } from 'mongoose';

type objectiveSchema = {
  content: string;
  isCompleted: boolean;
};

type taskSchema = {
  title: string;
  description: string;
  duration: number;
  priority: number;
  isActive: boolean;
  isCompleted: boolean;
  objectives: objectiveSchema[];
};
export type RoutineType = Document & {
  name: string;
  description: string;
  isActive: boolean;
  user: Schema.Types.ObjectId;
  // tasks: taskSchema[];
  tasks: Schema.Types.Array;
};

const schema = new Schema<RoutineType>(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // tasks: [
    //   {
    //     _id: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       default: () => new mongoose.Types.ObjectId(),
    //       required: true,
    //     },
    //     title: {
    //       type: String,
    //       required: true,
    //     },
    //     description: {
    //       type: String,
    //       required: true,
    //     },
    //     duration: {
    //       type: Number,
    //       required: true,
    //     },
    //     priority: {
    //       type: Number,
    //       required: true,
    //     },
    //     isActive: {
    //       type: Boolean,
    //       default: true,
    //       required: true,
    //     },
    //     isCompleted: {
    //       type: Boolean,
    //       default: false,
    //       required: true,
    //     },
    //     objectives: [
    //       {
    //         _id: {
    //           type: mongoose.Schema.Types.ObjectId,
    //           default: () => new mongoose.Types.ObjectId(),
    //           required: true,
    //         },
    //         content: {
    //           type: String,
    //           required: true,
    //         },
    //         isCompleted: {
    //           type: Boolean,
    //           default: false,
    //           required: true,
    //         },
    //       },
    //     ],
    //   },
    // ],
    tasks: {
      type: Schema.Types.Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<RoutineType>('Routine', schema);
