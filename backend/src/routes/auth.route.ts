import express from 'express';
import createTeacher from '../controllers/auth/createTeacher.controller';
import createStudent from '../controllers/auth/createStudent.controller';
import login from '../controllers/auth/login.controller';

const router = express.Router();

router.post('/teacher/register', createTeacher);
router.post('/student/register', createStudent);
router.post('/login', login);


export default router;
