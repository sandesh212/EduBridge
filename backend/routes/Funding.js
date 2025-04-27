const express = require('express');
const router = express.Router();
const multer = require("multer");
const fetchUser  = require('../MiddleWare/fetchUser');
const Funding = require('../models/Funding');
const { Connections } = require('../models/Connections');


// Configure multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, '../src/components/document');
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname);
	},
  });
  
  // Create multer upload instance
  const upload = multer({ storage: storage });


//Router 1: API to Post funding by Professional:
router.post('/post',fetchUser,upload.single('file'),async(req,res)=>{
    const {description,visibility,link} = req.body;
    let fileName = null; 
    if (req.file) {
      fileName = req.file.filename; 
    }
    try {
        const postFunding = await Funding({
            postBy: req.user.id,
            description : description,
            visibility : visibility,
            link: link,
            file: fileName
        })
        await postFunding.save();
        res.status(200).json({message : "Funding Post Successful"})

    } catch (error) {
        console.error({"Error" : error})
        res.status(500).json({"Error": "Some Inernal Error in API"})
    }
})

//userfetch

router.get('/fetch',fetchUser,async(req,res)=>{

  const funding = await Funding.find();
  // const Connectionfunding = await Funding.find().populate({
  //   path:'postBy',
  //   select: 'firstName lastName occupation image' 
  // })
  const Everyfunding = await Funding.find({visibility: 'everyone'}).populate({
    path:'postBy',
    select: 'firstName lastName occupation image' 
  })

  const postByArray = funding.map((fundingItem) => fundingItem.postBy.toString());

  const existingRequest = await Connections.findOne({
      user: req.user.id,
      supervisor: { $in: postByArray },
      status:"approved"
  });

    try{
      if (existingRequest) {
          const connectionFunding = await Funding.find({
          postBy: existingRequest.supervisor}).populate({
            path:'postBy',
            select: 'firstName lastName occupation image',
          });
        return res.status(200).json(connectionFunding);
        
      }
      return res.status(200).json(Everyfunding);
            
    } catch (error) {
        console.error({"Error" : error})
        res.status(500).json({"Error": "Server Inernal Error"})
    }

})

//supervisorFetch
router.get('/supervisorfundingsfetch', fetchUser, async (req, res) => {
  const { id: postBy } = req.user;
  try {
    const funding = await Funding.find({ postBy });
    res.status(200).json(funding);
  } catch (error) {
    console.error({"Error" : error});
    res.status(500).json({"Error": "Server Internal Error"});
  }
});

router.delete('/deleteFunding/:fundingId', fetchUser, async (req, res) => {
  try {
    const fundingId = req.params.fundingId;
    const userId = req.postBy

    // Check if the funding entry exists
    const fundingEntry = await Funding.findOne({ _id: fundingId, user: userId });

    if (fundingEntry !== null) {
      // The funding entry exists, so delete it
      await Funding.deleteOne({ _id: fundingId, user: userId });
      return res.json({ message: 'Funding entry deleted successfully' });
    } else {
      // The funding entry does not exist, so return a 404 error
      return res.status(404).json({ error: 'Funding entry not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/updateFunding/:id',async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  let fileName = null;

  if (req.file) {
    fileName = req.file.filename;
  }
  try {
    // Find the funding entry by ID
    const updatedFunding = await Funding.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedFunding) {
      return res.status(404).json({ error: "Funding entry not found" });
    }

    // Send the updated funding entry as the response
    res.status(200).json(updatedFunding);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating funding' });
  }
});
// Route for handling file uploads
router.post('/uploadFile', upload.single('file'), (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // File uploaded successfully, return the filename
    res.status(200).json({ success: true, filename: req.file.filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});


module.exports = router;