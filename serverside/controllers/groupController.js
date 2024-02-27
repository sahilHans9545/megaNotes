const Groups = require("../models/Groups");

const createGroup = async (req, res) => {
  try {
    const { groupName, groupColor } = req.body;
    console.log(req.user.userId);
    const existingGroup = await Groups.findOne({
      userId: req.user.userId,
      groupName,
    });

    if (existingGroup) {
      return res
        .status(400)
        .json({ message: "Group already exists!", group: existingGroup });
    }
    const newGroup = await Groups.create({
      userId: req.user.userId,
      groupName,
      groupColor,
    });
    await newGroup.save();
    return res.status(202).json({
      message: "Group created successfully",
      groupName: newGroup.groupName,
      groupColor: newGroup.groupColor,
      id: newGroup._id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Groups.find(
      { userId: req.user.userId },
      { groupName: 1, groupColor: 1 }
    ).sort({ updatedAt: -1 });
    return res.status(200).json({ groups });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addNotes = async (req, res) => {
  try {
    const { content, time, date } = req.body;
    if (!content || !time || !date) {
      return res.status(400).json({ message: "Fill all the details!" });
    }
    const { groupId } = req.params;
    await Groups.findOneAndUpdate(
      { _id: groupId, userId: req.user.userId },
      {
        $push: { notes: { content, time, date } },
      }
    );
    return res.json({
      message: "Note added successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      groupName: result.groupName,
      groupColor: result.groupColor,
      notes: result.notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGroup, getGroups, addNotes, getNotes };
