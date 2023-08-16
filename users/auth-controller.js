import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userDao from './users-dao.js';

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userDao.createUser({ username, password: hashedPassword, role });
  res.send('User registered successfully.');
}

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
