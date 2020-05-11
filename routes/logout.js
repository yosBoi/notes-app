const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //if token missing
  if(!req.cookies.access_token){
    res.status(400).json({message: {msgBody: "No access token in cookies", error:true}});
  }

  res.clearCookie('access_token');
  res.status(200).json({message: {msgBody: "token cleared", error:false}});
})

module.exports = router;