const mongoose = require("mongoose");

const typingSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    keyPressTime: Number,
    keyReleaseTime: Number,
    pressDuration: Number,
    intervalBetweenKeys: Number,
  },
  {
    timestamps: true, // ✅ YAHI MISSING THA
  }
);

module.exports = mongoose.model("TypingSession", typingSessionSchema);
