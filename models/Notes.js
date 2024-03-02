const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, min: 5, max: 50, required: true },
    description: { type: String, min: 5, max: 200, required: true },
    postedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
