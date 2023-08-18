import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userDao from './users-dao.js';
import * as profileDao from '../profiles/profile-dao.js';

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userDao.createUser({ username, password: hashedPassword, role });

  if (user) {
    // Create a new profile for the registered user
    const profile = await profileDao.createProfile({ userId: user._id, email: '', phone: '' });

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
}


const AuthController = (app) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
}

export default AuthController;
