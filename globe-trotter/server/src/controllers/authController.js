import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { store } from '../store/dataStore.js';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_globetrotter_jwt_token_key_2026';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, preferredCurrency } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = store.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = store.createUser({
      name,
      email,
      password: hashedPassword,
      preferredCurrency: preferredCurrency || 'USD'
    });

    const token = generateToken(user._id);
    const { password: _, ...userSafe } = user;

    res.status(201).json({
      user: userSafe,
      token,
      message: 'Registration successful'
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = store.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Support plain password match for demo seed or hashed for registered
    const isMatch = (user.password === password) || (await bcrypt.compare(password, user.password).catch(() => false));
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    const { password: _, ...userSafe } = user;

    res.status(200).json({
      user: userSafe,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error during login' });
  }
};

export const demoLogin = async (req, res) => {
  try {
    const demoUser = store.getUserById('user_demo_01');
    const token = generateToken(demoUser._id);
    const { password: _, ...userSafe } = demoUser;

    res.status(200).json({
      user: userSafe,
      token,
      message: 'Logged in as Demo Explorer'
    });
  } catch (error) {
    res.status(500).json({ error: 'Demo login error' });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = store.getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userSafe } = user;
    res.status(200).json({ user: userSafe });
  } catch (error) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { cityId } = req.body;
    const userId = req.user?.id || 'user_demo_01';
    const saved = store.toggleBookmark(userId, cityId);
    res.status(200).json({ savedDestinations: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
};
