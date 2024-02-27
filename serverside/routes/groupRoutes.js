const { Router } = require("express");
const { Auth } = require("../middlewares/auth");
const {
  createGroup,
  getGroups,
  addNotes,
  getNotes,
} = require("../controllers/groupController");

const router = Router();

router.route("/createGroup").post(Auth, createGroup);
router.route("/groups").get(Auth, getGroups);
router.route("/addNote/:groupId").post(Auth, addNotes);
router.route("/notes/:groupId").get(Auth, getNotes);

module.exports = router;
