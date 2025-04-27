const mongoose = require('mongoose');

//Create Work Experience Schema for User:
const WorkExperienceSchema = mongoose.Schema({
    
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title: { type: String, required: true },
    employee: { type: String, required: true },
    startDate:{type: Date,required :true},
    endDate:{type: Date, default: null},
    description:{type:String}
},{
    timestamps: true
})

WorkExperienceSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.startDate = formatDate(ret.startDate);
      ret.endDate = formatDate(ret.endDate);
      return ret;
    },
  });
  //func to format Date with no timing 
  function formatDate(date) {
    if (!date) {
      return 'Present';
    }
    const isoDate = new Date(date).toISOString();
    return isoDate.split('T')[0];
  }
  
//Export the Module to Work Experience:
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);

module.exports =  WorkExperience ;
