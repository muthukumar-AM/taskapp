const bcrypt = require('bcrypt');
const User = require('../Modal/userModal'); // Adjust the path to where your User model is located
const jwt = require('jsonwebtoken'); 
exports.Signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      console.log("User Already Exists");
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // Encrypt the password
    const encryptPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: encryptPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User Added Successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("User Not Found");
        return res.status(404).json({ message: 'User Not Found' });
      }
  
      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log("Invalid Password");
        return res.status(400).json({ message: 'Invalid Password' });
      }
  
      // Optionally: Generate a token (e.g., JWT) and send it to the client
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'Login Successful',
        token, // Send the token to the client (if using JWT)
        user: {
          username: user.username,
          email: user.email
        }
      });
  
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
