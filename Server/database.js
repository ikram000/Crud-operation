const mongoose = require("mongoose");

const databaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/book");
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
};


module.exports = databaseConnection;
