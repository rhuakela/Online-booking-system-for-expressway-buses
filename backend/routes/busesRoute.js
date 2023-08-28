const router = require("express").Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");
// this one is for Add bus

router.post("/add-bus", async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ number: req.body.number });
    if (existingBus) {
      return res.status(200).send({
        success: false,
        message: "Bus already exists",
      });
    }
    const newBus = new Bus(req.body);
    await newBus.save();
    return res.status(200).send({
      success: true,
      message: "Bus added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// this code for delete bus

router.post("/delete-bus", async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// this code for update bus

router.post("/update-bus", async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Bus updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// This code for to get all busses to user interface

router.post("/get-all-buses", async (req, res) => {
  try {
    const buses = await Bus.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// this code for get bus by using ID

router.post("/get-bus-by-id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    console.log(bus)
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: bus,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
