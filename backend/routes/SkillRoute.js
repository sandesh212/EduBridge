const express = require("express");
const Skill = require("../models/skill");
const router = express.Router();
const fetchUser = require("../MiddleWare/fetchUser");

router.post("/AddSkill", fetchUser, async (req, res) => {
  try {
    const { skillName } = req.body;
    const userId = req.user.id;

    // Check if the skill already exists for the user
    const existingSkill = await Skill.findOne({ user: userId, skillName });

    if (existingSkill) {
      return res.status(400).json({ error: "Skill already exists" });
    }
    // Create a new skill instance
    const skill = new Skill({ user: userId, skillName });

    const insertSkill = await skill.save();
    res.json(insertSkill);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Route 2 :Get All the Skill using:Get 'api/SkillRoute/fetchSkill'
router.get("/fetchSkill", fetchUser, async (req, res) => {
  const skill = await Skill.find({ user: req.user.id });
  res.json(skill);
});

router.get("/fetchSKill/:userId", async (req, res) => {
  const userId = req.params.userId;
  const skill = await Skill.find({ user: userId });
  res.json(skill);
});

router.delete("/deleteSkill/:skillId", fetchUser, async (req, res) => {
  try {
    const skillId = req.params.skillId;
    const userId = req.user.id;

    // Delete a single skill entry by its ID and the authenticated user's ID
    const deleteResult = await Skill.deleteOne({ _id: skillId, user: userId });

    // Check if the skill entry was deleted successfully
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Skill entry not found" });
    }

    res.json({ message: "Skill entry deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteSkill/:field/:value", fetchUser, async (req, res) => {
  try {
    const field = req.params.field;
    const value = req.params.value;
    const userId = req.user.id;

    // Delete multiple skill entries by a specific field-value pair and the authenticated user's ID
    const deleteResult = await skill.deleteMany({
      [field]: value,
      user: userId,
    });

    // Check if any skill entries were deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "No Skills entries found" });
    }

    res.json({ message: "Skill entries deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
