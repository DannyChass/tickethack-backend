const mongoose = require('mongoose');
const Trip = require('./trip');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }],
    booking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }]
});

const User = mongoose.model('users', userSchema);

module.exports = User;