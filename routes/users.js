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

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await res.json({ success: true, result: user });
  } else {
    res.json({ success: false })
  }
})

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
});

// POST - Ajouter un trip au panier d'un utilisateur
router.post('/addTripToUserCart', async (req, res) => {
  const { userId, tripId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const Trip = require('../models/trip');
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Voyage non trouvé' });
    }

    user.cart.push(trip._id);

    await user.save();

    res.json({ message: 'Voyage ajouté au panier', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (user) {
      res.json({ sucess: true, result: user });
    } else {
      res.json({ sucess: false })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
})

module.exports = router;