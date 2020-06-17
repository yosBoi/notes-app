const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')


router.post('/', async (req, res) => {
  //if email or username or password absent
  if(!req.body.username || !req.body.password || !req.body.email){
    return res.status(400).json({message: {msgBody: "Incomplete information provided", error: true}});
  }

  //if username or password less than 3 chars
  if(req.body.username.length < 3 || req.body.password.length < 3){
    return res.status(400).json({message: {msgBody:"Length of username and password should be 3 or more characters", error:true}});
  }


  let checkUsername = await User.findOne({username: req.body.username});

  //if username already exists
  if(checkUsername){
    return res.status(400).json({message: {msgBody:"Username already exists", error:true}});
  }

  let checkEmail = await User.findOne({email: req.body.email});

  //if email already exists
  if(checkEmail){
    return res.status(400).json({message: {msgBody: "Email already registered", error:true}});
  }

  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10)
  })

  newUser.save(err => {
    if(err){
      //log error for server
      console.log(err);
      //send error to client
      return res.status(500).json({message: {msgBody: "Server Error", error:true}})
    }
    else{
      res.status(201).json({message: {msgBody: "User successfully created", error:false}})
    }
  });
  
})


module.exports = router;