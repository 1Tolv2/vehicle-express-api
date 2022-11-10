const errorResponses = require("../utils/responseMessages");
const { requiredFieldsCheck } = require("./index");

const handleNewNote = async (req, res) => {};

const getCurrentUsersNotes = async (req, res) => {};

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
