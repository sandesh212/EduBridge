const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    projectTitle : {type: String,required: true},
    startDate : {type:Date,required:true},
    endDate : {type:Date,required:false},
    description:{type:String,required:false}
},{
    timestamps : true
})
ProjectSchema.set('toJSON', {
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
const Project = mongoose.model('project',ProjectSchema);
module.exports = Project