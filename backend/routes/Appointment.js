const express = require('express');
const router = express.Router();
const fetchUser  = require('../MiddleWare/fetchUser');
const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');
const chatModel = require('../models/chatModel')
//Route 1: To Add availability through selection the array
router.post('/Availability', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const selectedTimeslots = req.body;

    const notAvailableSelected = selectedTimeslots.some((timeslot) => timeslot.time === "Not Available");

    if (notAvailableSelected) {
      const dayToRemove = selectedTimeslots.find((timeslot) => timeslot.time === "Not Available").day;
      selectedTimeslots.filter((timeslot) => timeslot.day !== dayToRemove);
    }

    // Save each selected timeslot to the database
    for (const timeslot of selectedTimeslots) {
      // Check if the timeslot already exists in the database for the supervisor and day
      const existingTimeslot = await Availability.findOne({
        supervisor: userId,
        day: timeslot.day,
        time: timeslot.time
      });

      // If the timeslot exists, return an error response
      if (existingTimeslot) {
        return res.status(200).json({ message: 'Selected timeslot is already taken' });
      }

      await Availability.create({
        supervisor: userId,
        day: timeslot.day,
        time: timeslot.time
      });
    }

    res.status(200).json({ message: 'Timeslots saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Route 2: Fetch the Availability Through Date & UserID
router.post('/Availability/fetch',async(req,res)=>{
  const { date } = req.body;
  const {userId} = req.body;

  //Convert the Data into the Week
  const parsedDate = new Date(date);
  const options = { weekday: 'long' };

    // Get the day of the week
    const dayOfWeek = parsedDate.toLocaleString('en-US', options);
  try {
    // for time slots matching the provided date
    const availability= await Availability.find({ day: dayOfWeek,supervisor : userId });

    res.json(availability);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
})
//Router 3 : API to send Appointment Request to Supervisor:
router.post('/request',fetchUser,async(req,res)=>{
    const {supervisor,date,day,timeSlot,purpose} = req.body;

try {
        // Check if the timeslot is already booked by another user
        const existingRequest = await Appointment.findOne({
          supervisor: supervisor,
          date: date,
          day: day,
          timeSlot: timeSlot,
        });
    
        if (existingRequest) {
          return res.status(400).json({ message: "Timeslot is already booked" });
        }
      const appointment = new Appointment({
        user: req.user.id,
        supervisor,
        date,
        day,
        timeSlot,
        purpose
      })
      await appointment.save();
      res.json({message : "Appointment Request Send Successful"});
      
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to Send Appointment Request' });
}

})
//Router 4: API To fetch Appointment Request for Supervisor End:
router.get('/SupervisorFetch',fetchUser,async(req,res)=>{
  try {
    const supervisorId = req.user.id;
    const appointment = await Appointment.find({supervisor: supervisorId})
    .populate({
      path : 'user',
      select: 'firstName lastName occupation image' 
    });
    res.json(appointment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to Fetch Appointment Request' });
  }
})
//Router 5: API to Approved the Status of the Appointment on Supervisor End
router.put('/:AppointmentId/Approved',async(req,res)=>{
  try {

    const {AppointmentId} = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      AppointmentId,
      { status: "Accepted" },
      { new: true }
    )
    if (!appointment) {
      res.status(401).json({ error: "Appointment request not found" });
    }

    res.json({ message: "Appointment Requestion Approved Successful" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update Appointment request status' });
  }
})
//Router 6: API to Reject the Status of the Appointment on Supervisor End
router.put('/:AppointmentId/Rejected',async(req,res)=>{
  try {

    const {AppointmentId} = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      AppointmentId,
      { status: "rejected" },
      { new: true }
    )
    if (!appointment) {
      res.status(401).json({ error: "Appointment request not found" });
    }

    res.json({ message: "Appointment Requestion Rejected Successful" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update Appointment request status' });
  }
})

//Router 6: API to Delete the Booked Appointment on Supervisor End
router.delete('/:AppointmentId/delete',  async(req,res)=>{
  
  try {
    const {AppointmentId} = req.params;
    const appointment = await Appointment.findByIdAndDelete(AppointmentId);
    if (!appointment) {
      res.status(401).json({ error: "Appointment request not found" });
    }

    res.json({ message: "Appointment Request Delete Successful" });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to Delete Appointment' });
  }
}); 
//Router 7 : API To Fetch Appointment Request on Student End:
router.get('/StudentFetch',fetchUser,async(req,res)=>{
  try {
    const userId = req.user.id;

    const appointment = await Appointment.find({user: userId}).populate({
      path:'supervisor',
      select: 'firstName lastName occupation image' 
    });

    res.json(appointment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to Fetch Appointment Request' });
  }
})

//Router 8: To check User already send Connection
router.get("/existingRequest/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existingRequest = await Appointment.findOne({
      user: req.user.id,
      supervisor: id,
    });

    if (existingRequest) {

      const currentDate = new Date();
      const existingAppointmentDate = new Date(existingRequest.date);

      if (existingAppointmentDate < currentDate) {
        // Delete the existing appointment request
        await Appointment.findByIdAndDelete(existingRequest._id);

        return res.status(200).json({ message: "Existing appointment request has been deleted." });
      }
      
      return res.status(200).json({status : existingRequest.status});
    }
  } catch (error) {
    console.error("Error retrieving Appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;