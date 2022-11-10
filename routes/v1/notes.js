const express = require("express");
const n = require("../../controllers/notes");

const router = express();

router.post("/", n.handleNewNote);
router.get("/", n.getCurrentUsersNotes);

router.get("/vehicle/:id", n.getVehicleNotes);
router.put("/:id", n.editNote);
router.delete("/:id", n.handleDeletionNote);

module.exports = router;
