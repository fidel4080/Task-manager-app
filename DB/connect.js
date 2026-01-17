const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MONGODB connected successfully');

    } catch (error) {
        console.log('MONGODB connection failed', `${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;



