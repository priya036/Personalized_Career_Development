const User = require('../models/user');

exports.saveUser = async (req, res) => {
  const { name, email, picture } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
      return res.status(201).json({ message: 'User created', user });
    } else {
      return res.status(200).json({ message: 'User already exists', user });
    }
  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).send('Error saving user');
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).send('Error retrieving user');
  }
};