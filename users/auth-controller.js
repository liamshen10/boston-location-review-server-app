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

    // Create a new admin object if the role is 'administrator'
    if (role === 'administrator') {
      const adminUser = await userDao.createAdminUser({ userId: user._id });
      if (!adminUser) {
        console.error('Error creating admin user');
      }
    }
  } else {
    res.status(500).send('Error creating profile.');
  }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userDao.findUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });

    // Fetch all reviews for the logged-in user if the user is a reviewer
    let reviews = [];
    if (user.role === 'reviewer') {
      reviews = await userDao.getReviewsForUser(user._id);
      console.log("Reviewer RErviews", reviews);
    } else if (user.role === "administrator") {
      reviews = await userDao.getReviewsForAdmin(user._id);
      console.log("Admin Reviews:", reviews);
    }

    res.json({ user, reviews }); // Include the reviews in the response
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

const logout = async (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const fetchUsers = async (req, res) => {
  try {
    const users = await userDao.fetchUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users.');
  }
};


const AuthController = (app) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  app.get('/profile/:profileId', getProfile);
  app.put('/profile/:_id', updateProfile);
  app.post("/logout",   logout);
  app.get("/users", fetchUsers);
}

export default AuthController;