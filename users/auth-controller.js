import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userDao from './users-dao.js';
import * as profileDao from '../profiles/profile-dao.js';

const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body; // Include email from request body
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userDao.createUser({ username, password: hashedPassword, email, role }); // Include email when creating user

  if (user) {
    // Create a new profile for the registered user (without phone and email attributes)
    const profile = await profileDao.createProfile({ userId: user._id }); // No phone and email when creating profile

    if (profile) {
      res.send('User registered successfully with a profile.');
    } else {
      res.status(500).send('Error creating profile.');
    }
  } else {
    res.status(500).send('Error registering user.');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userDao.findUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials.');
  }
};

// Endpoint to retrieve user information by user ID
const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    res.status(500).send('Error retrieving user.');
  }
};

// Endpoint to update user information by user ID
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const userUpdateData = {
    username: req.body.username,
    email: req.body.email
  };
  try {
    const updatedUser = await updateUserById(userId, userUpdateData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    res.status(500).send('Error updating user.');
  }
};


const AuthController = (app) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  app.put('/user/:userId', updateUser); // Added route for updating user
  app.get('/user/:userId', getUser);
};

export default AuthController;

