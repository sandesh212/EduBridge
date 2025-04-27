const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    supervisor:{
        type:mongoose.Schema.Types.ObjectId,
    ref:   'user'
    },
    date:{
        type: Date
    },
    day:{type: String},
    timeSlot: {type:String} ,
    purpose:{type:String},
    status:{
        type:String,
        enum: ['pending','accepted','rejected'],
        default : 'pending'
    },
    sendDate:{
      type: Date,
      default: Date.now
    }
})

AppointmentSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.sendDate = formatDate(ret.sendDate);
      ret.date = formatDate(ret.date);
      return ret;
    },
  });
  //func to format Date with no time
  function formatDate(date) {
    const isoDate = new Date(date).toISOString();
    return isoDate.split('T')[0];
  }
  
const Appointment = mongoose.model('Appointment',AppointmentSchema);

module.exports = Appointment;