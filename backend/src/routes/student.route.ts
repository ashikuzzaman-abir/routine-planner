import express from 'express';
import getAllStudents from '../controllers/student/getAllStudents.controller';
import { protect } from '../middlewares/auth.middleware';
import role from '../middlewares/role.middleware';
const router = express.Router();

router.get('/', protect, role(['teacher']), getAllStudents);

export default router;
