import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getCurrentUser, 
  refreshToken 
} from '../controllers/auth.controller.js';

export const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refreshToken);

// Protected routes
authRouter.post('/logout', logout);
authRouter.get('/me', getCurrentUser);