import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      _id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      preferredCurrency: preferredCurrency || 'USD'
    });

    const token = generateToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      user: userObj,
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

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      user: userObj,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error during login' });
  }
};

export const demoLogin = async (req, res) => {
  try {
    const demoUser = await User.findById('user_demo_01');
    if (!demoUser) {
      return res.status(404).json({ error: 'Demo user not found. Did you run the seed script?' });
    }
    const token = generateToken(demoUser._id);
    const userObj = demoUser.toObject();
    delete userObj.password;

    res.status(200).json({
      user: userObj,
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
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ user: userObj });
  } catch (error) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { cityId } = req.body;
    const userId = req.user?.id || 'user_demo_01'; // Defaulting for demo purposes if auth middleware is absent
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const exists = user.savedDestinations.includes(cityId);
    if (exists) {
      user.savedDestinations = user.savedDestinations.filter(id => id !== cityId);
    } else {
      user.savedDestinations.push(cityId);
    }
    
    await user.save();
    res.status(200).json({ savedDestinations: user.savedDestinations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
};
