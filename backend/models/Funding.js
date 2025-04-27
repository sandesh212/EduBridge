const mongoose = require('mongoose');

const fundingSchema = new mongoose.Schema({
    postBy:{type:mongoose.Schema.Types.ObjectId,ref : 'user'},
    description:{type:String,required:true},
    visibility:{type:String,required:true},
    link:{type:String},
    file:{type:String},
    postDate:{type: Date, default: Date.now}
})

fundingSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.postDate = formatDate(ret.postDate);
      return ret;
    },
  });

  //func to format Date with no timing 
  function formatDate(date) {
    const isoDate = new Date(date).toISOString();
    return isoDate.split('T')[0];
  }
const Funding = mongoose.model('funding',fundingSchema);

module.exports = Funding;