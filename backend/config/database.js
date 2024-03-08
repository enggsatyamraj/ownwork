const mongoose = require("mongoose");
require("dotenv").config();

exports.connectWithDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (err) {
    console.error("Error connecting to the database");
    console.error(err.message);
    process.exit(1);
  }
};
