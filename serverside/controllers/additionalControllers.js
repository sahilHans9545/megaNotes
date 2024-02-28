const Groups = require("../models/Groups");

const shareNotes = async (req, res) => {
  try {
    const groups = await Groups.find({ userId: req.user.userId }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({ groups });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const { groupId } = req.params;
    const result = await Groups.findOne({
      _id: groupId,
      userId: req.user.userId,
    });
    return res.json({
      notes: result.notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const groupsByGroupName = async (req, res) => {
  try {
    const searchString = req.params.groupName;
    var regex = new RegExp(searchString, "i");
    const groups = await Groups.find({
      userId: req.user.userId,
      groupName: regex,
    }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({ groups });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { shareNotes, getNotes, groupsByGroupName };
