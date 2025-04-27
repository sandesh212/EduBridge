const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fetchUser = require('../MiddleWare/fetchUser');

//Route 1 : API to Create a User
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword,image:"" }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/find/:userId',async(req,res)=>{
	const userId = req.params.userId;

	try {
		const user = await User.findById(userId);
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
})

router.get('/getAllUsers',async(req,res)=>{

	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
})

//Route 2 : To Upload profile Image of User
// Configure multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, '../src/components/uploads');
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname);
	},
  });
  
  
  // Create multer upload instance
  const upload = multer({ storage: storage });

router.put('/uploads',fetchUser,upload.single('image'),async(req,res)=>{
	try{
		const userId = req.user.id;

		// Find the user profile by ID
		const userProfile = await User.findById(userId);
		
		// Update the profile image path
		userProfile.image = req.file.filename;

		await userProfile.save();

		return res.status(200).json({ message: 'Profile image updated successfully' }
		);

	}catch(error){
		console.error(error.message)
		return res.status(500).json({error : "Internal Server Error!"})
	}
})

module.exports = router;