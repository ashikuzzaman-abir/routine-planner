import express from 'express';
import getAllTeachers from '../controllers/teacher/getAllTeachers.controller';
import { protect } from '../middlewares/auth.middleware';
import role from '../middlewares/role.middleware';

const router = express.Router();

router.get('/', protect, role(['teacher']), getAllTeachers);

export default router;
