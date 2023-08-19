import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userDao from './users-dao.js';


const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userDao.createUser({ username, password: hashedPassword, role });

  if (user) {
    req.session["currentUser"] = user;
    res.json(user);
    } else {
      res.status(500).send('Error creating profile.');
    }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userDao.findUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json(user);
  } else {
    res.status(401).send('Invalid credentials.');
  }
}


const getProfile = async (req, res) => {
  const { profileId } = req.params;
  const profile = await userDao.getProfile(profileId);

  
  if (profile) {
    // Hide sensitive information for other users
    if (req.user && req.user._id !== profile.userId) {
      profile.email = undefined;
      profile.phone = undefined;
    }

    res.json(profile);
  } else {
    res.status(404).send('Profile not found.');
  }
}

const updateProfile = async (req, res) => {
  const {_id} = req.params;
  console.log(_id);
  const profileUpdate = req.body;
  console.log(profileUpdate);

  const updatedProfile = await userDao.updateProfile(_id, profileUpdate);
  console.log(updatedProfile);
  if (updatedProfile) {
  const user = await userDao.getProfile(_id);
  req.session['currentUser'] = user;
  res.json(user);
  }
  else {
    res.send("Profile Not Found!");
  }
}


const AuthController = (app) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  app.get('/profile/:profileId', getProfile);
  app.put('/profile/:_id', updateProfile);
}

export default AuthController;