const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  saveTypingData,
  getUserSessions,
} = require("../controllers/typingController");

// ✅ POST: save typing data
router.post("/save", auth, saveTypingData);

// ✅ GET: fetch history
router.get("/history", auth, getUserSessions);

module.exports = router;
