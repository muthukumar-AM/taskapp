const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('MongoDB URL:', process.env.MONGO_URL); // Debugging line
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Could not connect to DB:', err);
        process.exit(1); // Optional: Exit the process if connection fails
    }
};

module.exports = connectDB;
