import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Sign up
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

    const access_Token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
    const refresh_Token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful', access_Token, refresh_Token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const refresh_Token = async (req: Request, res: Response): Promise<Response | void> => {
  const { refresh_Token } = req.body;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  try {
    if (!refresh_Token) {
      return res.status(403).json({ message: 'Refresh token required', access_Token: '', refresh_Token: '' });
    }

    const decoded = jwt.verify(refresh_Token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    const access_Token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      message: 'Token refreshed successfully',
      access_Token: access_Token,
      refresh_Token: newRefreshToken,
    });
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: 'Invalid refresh token', access_Token: '', refresh_Token: '' });
  }
};
