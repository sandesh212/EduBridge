const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const EducationSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    InstituteName: { type: String, required: true },
    degree: { type: String, required: true },
    startDate:{type: Date, required :true},
    endDate:{type: Date, default: null},

},{
    timestamps: true
})

EducationSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.startDate = formatDate(ret.startDate);
      ret.endDate = formatDate(ret.endDate);
      return ret;
    },
  });

  //func to format Date with no time Stamp
  function formatDate(date) {
    if (!date) {
      return 'Present';
    }
    const isoDate = new Date(date).toISOString();
    return isoDate.split('T')[0];
  }
const Education = mongoose.model("education", EducationSchema);

module.exports =  Education ;