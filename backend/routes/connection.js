const express = require("express");
const router = express.Router();
const fetchUser = require("../MiddleWare/fetchUser");
const { Connections, validate } = require("../models/Connections");
const { User } = require("../models/user");
const mongoose = require('mongoose');


//Route 1 : API to add connection with user to send Request
router.post("/AddConnection", fetchUser, async (req, res) => {
  try {
    const { error } = validate(req.body);
    const { supervisor } = req.body;

    const existingRequest = await Connections.findOne({
      user: req.user.id,
      supervisor: supervisor,
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Request already sent" });
    }
    //Validation Condition for empty interest & Commant
    if (error) return res.status(404).send({ error: error.details[0].message });

    const connection = await Connections({
      user: req.user.id,
      supervisor,
      ...req.body,
    });
    const InsertConnection = await connection.save();
    res.json(InsertConnection);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 2 : To Fetch All Connection on Behalf of Supervisor ID with userData
router.get("/fetchConnection", fetchUser, async (req, res) => {
  try {
    const supervisorId = req.user.id;

    const connections = await Connections.find({ supervisor: supervisorId })
      .populate("user") //Appent ths user field to the particular user Id
      .exec();

    if (!connections || connections.length === 0) {
      return res.status(404).json({ error: "Connection not found" });
    }

    // Append the user data to the connection data
    const connectionsWithUserData = connections.map((connection) => ({
      ...connection.toObject(),
      user: connection.user ? connection.user.toObject() : null,
    }));
    res.json(connectionsWithUserData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Inernal Server error" });
  }
});

//Router 3 : API to update the status if user approved the connection request
router.put("/:connectionId/approved", async (req, res) => {
  try {
    const { connectionId } = req.params;
    const connection = await Connections.findByIdAndUpdate(
      connectionId,
      { status: "approved" },
      { new: true }
    );
    if (!connection) {
      res.status(401).json({ error: "Connection request not found" });
    }

    res.json({ message: "Connection Requestion Approved Successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update connection request status" });
  }
});

//Router 4 : API to update the status if user reject the connection request
router.put("/:connectionId/rejected", async (req, res) => {
  try {
    const  {connectionId } = req.params;

    const connection = await Connections.findByIdAndDelete(connectionId);
    if (!connection) {
      res.status(401).json({ error: "Connection request not found" });
    }
    res.json({ message: "Connection Requestion rejected Successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update connection request status" });
  }
});
//Router 5: API to fetch the Supervisor who Accepted the request
router.get("/fetchApprovSupervisor", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const connections = await Connections.find({ user: userId }).populate({
      path:'supervisor',
      select: 'firstName lastName occupation image' 
    });
    res.json(connections);
  } catch (error) {
    console.error("Error retrieving connection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Router 6: To check User already send Connection
router.get("/existingRequest/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existingRequest = await Connections.findOne({
      user: req.user.id,
      supervisor: id,
    });

    if (existingRequest) {
      return res.status(200).json({status : existingRequest.status});
    }
  } catch (error) {
    console.error("Error retrieving connection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Router 7:API to delete Connections 
router.delete('/deleteConnection/:id',async(req,res)=>{
  const {id} = req.params;

  try {

    const DeleteConnection = await Connections.findByIdAndDelete(id);
    if (!DeleteConnection) {
      res.status(401).json({ error: "Connection request not found" });
    }

    res.json({ message: "Connection Request Delete Successful" });

    
  } catch (error) {

    console.error("Error retrieving connection:", error);
    res.status(400).json({ error: "Failed to Delete Appointmentr" });
    
  }

});

router.get('/fetchChatUsers/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const connections = await Connections.find({
      $or: [
        { user: userId , status: "approved" },
        { supervisor: userId , status: "approved" }
      ]
    }).populate({
      path: 'user',
      select: 'firstName lastName occupation image',
    }).populate({
      path: 'supervisor',
      select: 'firstName lastName occupation image',
    });

    if (connections.length > 0) {
      res.status(200).json(connections);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
