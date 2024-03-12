import express from 'express';
import generateTasksController from '../controllers/routine/generateRoutine.controller';
import { protect } from '../middlewares/auth.middleware';
import createRoutine from '../controllers/routine/createRoutine.controller';
import getAllRoutines from '../controllers/routine/getAllRoutines.controller';
import deleteRoutine from '../controllers/routine/deleteRoutine.controller';
const router = express.Router();

router.get('/', protect, getAllRoutines);
router.post('/', protect, createRoutine);
router.delete('/:id', protect, deleteRoutine);

export default router;
