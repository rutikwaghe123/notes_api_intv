const router = require("express").Router();
const Notes = require("../models/Notes");
const User = require("../models/User");
//create note
router.post("/addNote", async (req, res) => {
  try {
    //insert note reference with userId
    const note = new Notes({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });

    //insert data using save()
    const result_data = await note.save();

    res.status(200).json(result_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get note
router.get("/getNote/:id", async (req, res) => {
  try {
    //first check user exists or not
    const isUserExists = await User.findById(req.params.id);
    !isUserExists && res.status(400).json({ message: "User not found" });

    //find note by user id and return the notes
    const note = await Notes.find({ postedBy: req.params.id }).sort([
      ["createdAt", -1],
    ]);

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete note
router.delete("/deleteNote/:id", async (req, res) => {
  try {
    //check note exists or not
    const isNoteExists = await Notes.findOne({ _id: req.params.id });
    !isNoteExists && res.status(400).json({ message: "Notes not found" });

    //delete object
    const note = await Notes.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Note delete successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update note
router.put("/updateNote/:id", async (req, res) => {
  try {
    //check note exists or not
    const isNoteExists = await Notes.findOne({ _id: req.params.id });
    !isNoteExists && res.status(400).json({ message: "Notes not found" });

    //update object
    const note = await Notes.updateOne({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
