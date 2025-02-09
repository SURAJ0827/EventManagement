const Event = require("../models/eventModel");

// Create an Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const event = await Event.create({
      name,
      description,
      date,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log(error);
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Only Creator Can Delete
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found!" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update an Event Only Creator Can Update
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found!" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    const { name, description, date } = req.body;
    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
