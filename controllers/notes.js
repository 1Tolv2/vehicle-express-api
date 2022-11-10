const errorResponses = require("../utils/responseMessages");
const {
  createNote,
  findNotesByUser,
  findNotesByVehicle,
  findNoteById,
  updateNote,
  deleteNote,
} = require("../models/notes");
const { requiredFieldsCheck } = require("./index");

const { oops, missingReqFields } = errorResponses;

const handleNewNote = async (req, res) => {
  const missingFields = requiredFieldsCheck(req.body, ["text", "vehicleId"]);

  if (missingFields.length !== 0) {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  } else {
    const newNote = {
      text: req.body.text,
      user: req.user.userId,
      vehicle: req.body.vehicleId,
    };
    let note = null;
    try {
      note = await createNote(newNote);
      res.status(201).json({ note });
    } catch (err) {
      console.log(err);
      res.status(oops.status).json({ error: oops.message });
    }
  }
};

const getCurrentUsersNotes = async (req, res) => {
  try {
    const notes = await findNotesByUser(req.user.userId);
    res.status(200).json({ notes });
  } catch (err) {
    console.log(err);
    res.status(oops.status).json({ error: oops.message });
  }
};

const getVehicleNotes = async (req, res) => {};

const editNote = async (req, res) => {};

const handleDeletionNote = async (req, res) => {};

module.exports = {
  getCurrentUsersNotes,
  handleNewNote,
  getVehicleNotes,
  editNote,
  handleDeletionNote,
};
