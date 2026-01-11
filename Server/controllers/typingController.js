const TypingSession = require("../models/TypingSession");

// SAVE TYPING DATA
const saveTypingData = async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ message: "No typing data received" });
    }

    const data = req.body.map(item => ({
      userId: req.userId,
      keyPressTime: item.keyPressTime,
      keyReleaseTime: item.keyReleaseTime,
      pressDuration: item.pressDuration,
      intervalBetweenKeys: item.intervalBetweenKeys,
    }));

    await TypingSession.insertMany(data);
    res.json({ message: "Typing data saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER SESSION HISTORY
const getUserSessions = async (req, res) => {
  try {
    const sessions = await TypingSession.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  saveTypingData,
  getUserSessions,
};
