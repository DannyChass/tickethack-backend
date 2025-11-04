var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

//GET - Get all trips
router.get('/', async function (req, res, next) {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//GET - Get a trip by id
//GET - Find all trips by filters (search)
router.get('/search', async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    const filter = {};

    if (departure) filter.departure = departure;
    if (arrival) filter.arrival = arrival;

    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      filter.date = { $gte: selectedDate, $lt: nextDay };
    }

    const trips = await Trip.find(filter);
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

//GET
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id });
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;