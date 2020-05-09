const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  if(!req.cookies.access_token){
    return res.json({isAuthenticated: false, message: {msgBody: "No access token in cookies", error:true}});
  }

  jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, user) => {
    if(err){
      return res.status(400).json({isAuthenticated: false, message: {msgBody: "Invalid access token", error:true}});
    }
    res.status(200).json({isAuthenticated: true, username:user.username, message: {msgBody: "Successfully authorized", error:false}});
  });

})

module.exports = router;