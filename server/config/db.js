const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://travel:travel@travelcluster.6gt2v.mongodb.net/travelapp?retryWrites=true&w=majority');

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;