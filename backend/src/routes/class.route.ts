import express from 'express';
import createClass from '../controllers/class/createClass.controller';
import { protect } from '../middlewares/auth.middleware';
import role from '../middlewares/role.middleware';
import getAllClasses from '../controllers/class/getAllClassess.controller';
import getUpcomingClasses from '../controllers/class/getUpcomingClasses.controller';
import attendClass from '../controllers/class/attendClass.controller';

const router = express.Router();

router.post('/', protect, role(['teacher']), createClass);
router.get('/', protect, role(['teacher']), getAllClasses);
router.get('/upcoming', protect, role(['student']), getUpcomingClasses);
router.put('/attend/:id', protect, role(['student']), attendClass);

export default router;
