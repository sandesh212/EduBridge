const express  = require("express");
const Project  = require('../models/project');
const router = express.Router();
const fetchUser  = require('../MiddleWare/fetchUser');

router.post('/AddProject',fetchUser, async(req,res)=>{
try {

    const {projectTitle,startDate,endDate,description} = req.body;
    const project  = new Project({
        
        user : req.user.id , projectTitle,startDate,endDate,description
    })
    const insertProject = await project.save();
    res.json(insertProject).status("Project Add Successfull")
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured: " + error);
    }
}
)

//Route 2 :Get All the Project using:Get 'api/ProjectRoute/fetchProject'
router.get('/fetchProject',fetchUser,async (req,res)=>{
    const project = await Project.find({ user: req.user.id });
    res.json(project)
})

router.get('/fetchProject/:userId',async (req,res)=>{
    const userId = req.params.userId;
    const project = await Project.find({user : userId});
    res.json(project)
})

router.delete('/deleteProject/:projId',fetchUser,async(req,res)=>{
    try {
        const projId = req.params.projId;
        const userId = req.user.id;
    
        // Delete a single project entry by its ID and the authenticated user's ID
        const deleteResult = await Project.deleteOne({ _id: projId, user: userId });
    
        // Check if the project entry was deleted successfully
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Project entry not found' });
        }
    
        res.json({ message: 'Project entry deleted successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
      }
});
 // Update an project entry
 router.put('/updateProject/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      // Find the project entry by ID and update it
      const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project entry not found' });
      }
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'An error occurred while updating project' });
    }
  });

module.exports = router;