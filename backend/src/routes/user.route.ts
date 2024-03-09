import express from 'express';
import createAUser from '../controllers/user/createAuser.controller';
import getSelf from '../controllers/user/getSelf.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', createAUser);
router.get('/me', protect, getSelf);

export default router;
