const usermodel = require("../model/usermodel");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  //Existing User
  //Hashed password
  //user Creation
  //Token generation

  const { username, email, password } = req.body;

  try {
    const existingUser = await usermodel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exisiting" });
    }

    const hashpassword = await bcrypt.hash(password, 10);


    

    const result = await usermodel.create({
      email: email,
      password: hashpassword,
      username: username,
    });

    //token

    const token = jwt.sign({email:result.email ,id:result._id ,},SECRET_KEY);

    res.status(200).json({user:result,token:token});



  } catch (error) {


    console.log(error);
    res.status(500).json({message:'something went wrong!'});

    
  }
};

const signin = async (req, res) => {


  const {username,email,password} = req.body;

  try {
    
    const existingUser = await usermodel.findOne({email:email});

    if(!existingUser)
    {
      return res.status(400).json({message:"user not found"});

    }

    const matchpassword = await bcrypt.compare(password,existingUser.password);

    if(!matchpassword)
    {
      return res.status(400).json({message:"Invalid credentials"});

    }


    //token

    const token = jwt.sign({email:existingUser.email ,id:existingUser._id},SECRET_KEY);

    res.status(201).json({user:existingUser,token:token , chutiya:"chutiya always you get it as soon as possible!"});




  } catch (error) {
    
    console.log(error);
    res.status(500).json({message:'something went wrong!'});

  }


};

module.exports = { signup, signin };
