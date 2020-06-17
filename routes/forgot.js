const express = require('express');
const router = express.Router();
const shortid = require('shortid')
const bcrypt = require('bcrypt');
const User = require('../models/User')

const nodemailer = require('nodemailer');


router.post('/', async (req,res) => {
  //if email not in request
  if(!req.body.email){
    return res.status(400).json({message: {msgBody: "no email provided", error:true}});
  }

  let user = await User.findOne({email: req.body.email});

  //if that email not in db
  if(!user){
    return res.status(404).json({message: {msgBody: "Email not registered", error:true}})
  }

  let recoveryCode = shortid.generate();

  user.recoveryCode = recoveryCode;

  user.save(err => {
    if(err)
      return res.status(500).json({message: {msgBody: "Server error", error:true}});

    //res.status(200).json({message:{msgBody: "Recovery code generated", error:false}});
  })

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yosboi.dev@gmail.com',
      pass: process.env.GMAILPASS
    }
  });

  let mailOptions = {
    from:"yosboi.dev@gmail.com",
    to: req.body.email,
    subject: "yos-notes Password Recovery Code",
    text: `Your username is ${user.username} and your recovery code is ${recoveryCode}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      console.error(err);
    }
    //console.log(info)
    res.status(200).json({message: {msgBody: "Recovery code generated and sent on mail", error:false}});
  })

})

router.post('/reset', async (req,res) => {
  
  //if missing info
  if(!req.body.email || !req.body.recoveryCode || !req.body.password){
    return res.status(400).json({message: {msgBody: "Incomplete information provided", error:true}});
  }

  let user = await User.findOne({email: req.body.email});

  if(!user){
    return res.status(404).json({message: {msgBody: "email not registered", error:true}});
  }

  //console.log(user);

  if(user.recoveryCode !== req.body.recoveryCode){
    return res.status(401).json({message: {msgBody: "Wrong recovery code", error:true}});
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  user.recoveryCode = null;

  (await user).save(err => {
    if(err){
      console.error(err);
    }

    res.status(200).json({message: {msgBody: "Password updated", error:false}});
  })
})

module.exports = router;