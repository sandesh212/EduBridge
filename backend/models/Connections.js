const mongoose = require('mongoose');
const Joi = require("joi");

const ConnectionSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        default: null
        
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        default: null
    },
    interest:{type: String},
    comment: {type:String},
    sendDate:{
        type: Date, 
        default: Date.now,
    },
    status:{
        type:String,
        enum: ['pending','approved','rejected'],
        default : 'pending'
    }
})
ConnectionSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.sendDate = formatDate(ret.sendDate);
      return ret;
    },
  });
  //func to format Date with no timing 
  function formatDate(date) {
    const isoDate = new Date(date).toISOString();
    return isoDate.split('T')[0];
  }

const validate = (data)=>{
    const schema = Joi.object({
        supervisor : Joi.string().strip(),
        interest: Joi.string().required().label("Please Enter Interest"),
		comment: Joi.string().required().label("Please Enter Commont"),
    });
    return schema.validate(data);
}

const Connections = mongoose.model('Connection',ConnectionSchema);

module.exports = {Connections,validate};