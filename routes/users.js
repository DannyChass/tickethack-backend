var express = require('express');
var router = express.Router();
var User = require('../models/user');

//GET - get all users
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//POST - Add a new user
router.post('/addUser', async (req, res) => {
  try {
    const user = new User({
      fistName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      cart: [],
      booking: []
    })

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
