const mongoose = require("mongoose");
require("dotenv").config();

exports.connectWithDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://sattu62025:thisispassword@cluster0.p3pth5b.mongodb.net/", {
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
