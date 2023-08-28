const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connection is ok");
});

db.on("error", () => {
  console.log("Database connection is failed");
});
