const { Router } = require("express");
const { Auth } = require("../middlewares/auth");
const {
  getNotes,
  shareNotes,
  groupsByGroupName,
} = require("../controllers/additionalControllers");

const router = Router();

router.route("/share-notes").get(Auth, shareNotes); //api url --> serverUrl/api/share-notes
router.route("/share-group-notes/:groupId").get(Auth, getNotes); //api url --> serverUrl/api/share-group-notes/:groupId
router.route("/groups/:groupName").get(Auth, groupsByGroupName); //api url --> serverUrl/api/groups/:groupName

module.exports = router;
