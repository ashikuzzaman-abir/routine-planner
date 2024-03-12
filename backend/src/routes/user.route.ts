import express from 'express';
import createAUser from '../controllers/user/createAuser.controller';
import getSelf from '../controllers/user/getSelf.controller';
import { protect } from '../middlewares/auth.middleware';
import deleteUser from '../controllers/user/deleteUser.controller';

const router = express.Router();

router.post('/', createAUser);
router.get('/me', protect, getSelf);
router.delete('/:id', protect, deleteUser);

export default router;
