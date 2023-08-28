require("dotenv").config();
const express = require("express");
const cors = require('cors');

const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 8070;

const app = new express();

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

app.listen(port, () => console.log(`RHU Akela  port ${port}`));
