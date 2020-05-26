const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  //if username or password missing
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: {msgBody: "Incomplete login information provided", error:true}});
  }

  //if username or password less than 3 chars
  if(req.body.username.length < 3 || req.body.password.length < 3){
    return res.status(404).json({message: {msgBody:"Wrong username and password combination", error:true}});
  }

  let user = await User.findOne({username: req.body.username});

  ///if user not found in DB
  if(!user){
    return res.status(404).json({message: {msgBody:"Wrong username and password combination", error:true}});
  }

  await bcrypt.compare(req.body.password, user.password, (err, result) => {
    if(err){
      return res.status(500).json({message: {msgBody: "bcrypt compare error", error:true}});
    }
    //if password doesnt match
    if(!result){
      return res.status(401).json({message: {msgBody: "Wrong username and password combination", error:true}});
    }

    const token = jwt.sign(
      {username: user.username},
      process.env.JWT_SECRET, 
      {expiresIn: "2h"}
    );
  
    res.cookie('access_token', token, {httpOnly: true});
    res.status(200).json({isAuthenticated: true, username: req.body.username, message: {msgBody:`Successfully loged in as ${user.username}`, error:false}});
  })

})


module.exports = router;