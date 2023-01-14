const {
  findUserById,
  updateUser,
  findUserByUsername,
  createUser,
} = require("../models/user");
const errorResponses = require("../utils/responseMessages");
const { requiredFieldsCheck } = require("./index");

const { oops, notUnique, missingReqFields } = errorResponses;

const handleNewUser = async (req, res) => {
  const missingFields = requiredFieldsCheck(req.body, ["username", "password"]);
  if (missingFields.length !== 0) {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  } else {
    try {
      const username = req.body.username.toLowerCase();
      const { password, settings } = req.body;

      if (await findUserByUsername(username)) {
        res
          .status(notUnique.status)
          .json({ error: "User " + notUnique.message });
      } else {
        const user = await createUser({
          username: username,
          password,
          settings: {
            language: settings.hasOwnProperty("language")
              ? settings?.language
              : "en",
            units: settings.hasOwnProperty("units")
              ? settings?.units
              : "metric",
            darkmode: false,
          },
        });

        res.status(201).json({ username: user.username });
      }
    } catch (err) {
      res.status(oops.status).json({ error: oops.message });
    }
  }
};

const getCurrentUser = async (req, res) => {
  const id = req.user.userId;
  try {
    const user = await findUserById(id);
    res.json({ user });
  } catch (err) {
    res.status(oops.status).json({ error: oops.message });
  }
};

const editCurrentUser = async (req, res) => {
  const id = req.user.userId;
  const body = req.body;
  const editables = ["username", "language", "darkmode", "units"];
  let edits = {};
  for (let i = 0; i < editables.length; i++) {
    if (body.hasOwnProperty(editables[i])) {
      if (
        editables[i] === "language" ||
        editables[i] === "units" ||
        editables[i] === "darkmode"
      ) {
        edits["settings." + editables[i]] = body[editables[i]];
      } else if (editables[i] === "username") {
        const usernameExists = await findUserByUsername(body[editables[i]]);
        if (!usernameExists) {
          edits[editables[i]] = body[editables[i]].toLowerCase();
        }
      } else {
        edits[editables[i]] = body[editables[i]].toLowerCase();
      }
    }
  }
  if (Object.keys(edits).length === 0) {
    res.json({ message: "No changes made" });
  } else {
    try {
      await updateUser(id, edits);
    } catch (err) {
      res.status(oops.status).json({ error: oops.message });
    }
    res.status(200).json({ message: "Success" });
  }
};

module.exports = { getCurrentUser, editCurrentUser, handleNewUser };
