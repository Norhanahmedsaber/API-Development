import express from 'express';
import { signup, login, refresh_Token } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin',  login as express.RequestHandler);
router.post('/refresh-token', refresh_Token as express.RequestHandler);

export default router;
