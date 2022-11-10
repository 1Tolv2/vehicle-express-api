const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

const createNote = async (newNote) => {
  const note = new Note(newNote);
  await note.save();
  return note;
};

const findNotesByUser = (userId) => {
  return Note.find({ user: userId }).exec();
};

const findNotesByVehicle = (vehicleId) => {
  return Note.find({ vehicle: vehicleId }).exec();
};

const findNoteById = (id) => {
  return Note.findById(id).exec();
};

const editNote = (id, body) => {
  return Note.findByIdAndUpdate(id, body, { new: true }).exec();
};

const deleteNote = (id) => {
  return Note.deleteOne({ _id: mongoose.Types.ObjectId(id) });
};

module.exports = {
  createNote,
  findNotesByUser,
  findNotesByVehicle,
  findNoteById,
  editNote,
  deleteNote,
};
