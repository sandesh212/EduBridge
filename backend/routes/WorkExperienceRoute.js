const express = require('express');
const router = express.Router();
const fetchUser = require('../MiddleWare/fetchUser');
const WorkExperience = require('../models/WorkExperience');

//Route 1 : Post Data in Work Experience
router.post('/AddWorkExperience',fetchUser,async(req,res)=>{
    try {
        const {title,employee,startDate,endDate,description} = req.body;
        const workExperience  = new WorkExperience({

            user: req.user.id,title,employee,startDate,endDate,description
        })
        //insert New Work Experience
        const insertWorkExperience = await workExperience.save();
        res.json(insertWorkExperience);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured :",error);
    }
})

//Route 2 :Get All the Work using:Get 'api/WorkRoute/fetchWork'
router.get('/fetchWorkExperience',fetchUser,async (req,res)=>{
    const workexperience = await WorkExperience.find({ user: req.user.id });
    res.json(workexperience)
})
router.get('/fetchWork/:userId',async (req,res)=>{
    const userId = req.params.userId;
    const workexperience = await WorkExperience.find({user : userId});
    res.json(workexperience);
})
//to Delete the work entry
router.delete('/deleteWork/:workID', fetchUser, async (req, res) => {
    try {
      const workID = req.params.workID;
      const userId = req.user.id;
  
      // Delete a single work experience entry by its ID and the authenticated user's ID
      const deleteResult = await WorkExperience.deleteOne({ _id: workID, user: userId });
  
      // Check if the work entry was deleted successfully
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Work Experience entry not found' });
      }
  
      res.json({ message: 'Work Experience entry deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  // Update an work entry
router.put('/updateWorkExperience/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find the work entry by ID and update it
    const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedWorkExperience) {
      return res.status(404).json({ error: 'Work entry not found' });
    }
  } catch (error) {
    console.error('Error updating work experience:', error);
    res.status(500).json({ error: 'An error occurred while updating work' });
  }
});

module.exports = router;