import express from 'express';
import generateTasksController from '../controllers/routine/generateRoutine.controller';
;

const router = express.Router();

router.get('/generate-routines', generateTasksController);

export default router;
