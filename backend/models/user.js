const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

//Create User Scheme
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	occupation:{type: String,required: true},
	image:{type: String}
},{
	timestamps:true
});

const User = mongoose.model("user", userSchema);

//validate user to Enter all data required 
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		occupation: Joi.string().required().label("Occuption"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };