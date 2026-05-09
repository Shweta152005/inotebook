// Import required packages
const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Used for request validation
const { body, validationResult } = require('express-validator');

// Used for password hashing
const bcrypt = require('bcryptjs');
// Used for JWT authentication
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'harriisagoodbo';

// ✅ Route 1: Create User - POST /api/auth/createuser
router.post(
  '/createuser',
  [
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'A user with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ✅ Route 2: Login User - POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Please try to login with correct credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: 'Please try to login with correct credentials' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);
//Route-3 get user logged-in details using POSt 'api/auth/getuser'
router.post(
  '/getuser',fetchuser,async (req, res) => {

try{
  userId=req.user.id;
const user = await User.findById(userId).select("-password")
res.send(user);
}catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  })
module.exports = router;
