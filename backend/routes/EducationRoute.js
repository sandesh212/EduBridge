const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchUser = require("../MiddleWare/fetchUser");
const Education = require("../models/Education");

//Route 1: Insert Data for Education a User Can ADD Education:
router.post('/AddEducation',fetchUser, async(req,res)=>{
    try {
        const { InstituteName, degree, startDate, endDate } = req.body;
        const education = new Education({

            user: req.user.id,InstituteName, degree, startDate,endDate ,
    })

    const InsertEducation = await education.save();
    res.json(InsertEducation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route 2 :Get All the Education using:Get 'api/EducationRoute/fetchEducation'
router.get("/fetchEducation", fetchUser, async (req, res) => {
  const education = await Education.find({ user: req.user.id });
  res.json(education);
});

router.get("/fetchEducation/:userId", async (req, res) => {
  const userId = req.params.userId;
  const education = await Education.find({ user: userId });
  res.json(education);
});

router.delete('/deleteEducation/:educationId', fetchUser, async (req, res) => {
    try {
      const educationId = req.params.educationId;
      const userId = req.user.id;
  
      // Delete a single education entry by its ID and the authenticated user's ID
      const deleteResult = await Education.deleteOne({ _id: educationId, user: userId });
  
      // Check if the education entry was deleted successfully
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Education entry not found' });
      }
  
      res.json({ message: 'Education entry deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  

  router.delete('/deleteEducationByField/:field/:value', fetchUser, async (req, res) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      const userId = req.user.id;
  
      // Delete multiple education entries by a specific field-value pair and the authenticated user's ID
      const deleteResult = await Education.deleteMany({ [field]: value, user: userId });
  
      // Check if any education entries were deleted
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'No education entries found' });
      }
  
      res.json({ message: 'Education entries deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  // Update an education entry
router.put('/updateEducation/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find the education entry by ID and update it
    const updatedEducation = await Education.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEducation) {
      return res.status(404).json({ error: 'Education entry not found' });
    }
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ error: 'An error occurred while updating education' });
  }
});

module.exports = router;
