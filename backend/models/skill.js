const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    skillName: {type: String,}
})

//Export the Module to The User:
const Skill = mongoose.model("skill", SkillSchema);

module.exports =  Skill ;
