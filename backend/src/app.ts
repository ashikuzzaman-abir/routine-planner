import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './db';

import errorHandler from './middlewares/errorHandler.middleware';

//routes
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import studentRoutes from './routes/student.route';
import classRoutes from './routes/class.route';
import teacherRoutes from './routes/teacher.route';
import routineRoutes from './routes/routine.route';

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the server' });
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/routine', routineRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
