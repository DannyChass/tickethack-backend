const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://danielchassagn_db_user:1234@cluster0.r9vlero.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error));

module.exports = mongoose;