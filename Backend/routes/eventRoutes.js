const express = require("express");
const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.get("/", getEvents);
router.put("/update/:id", authMiddleware, updateEvent);
router.delete("/delete/:id", authMiddleware, deleteEvent);

module.exports = router;
