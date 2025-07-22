const mongoose = require('mongoose');
const connectDb = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log("🟢 Connected to MongoDB") )
}
module.exports = connectDb;