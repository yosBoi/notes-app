const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const User = require('../models/User')


router.get('/', async (req, res) => {
  const token = req.cookies.access_token;

  if(!token){
    return res.status(401).json({message: {msgBody: "Missing auth token", error: true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if(err){
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    }

    const noteUser = await User.findOne({username: user.username});

    res.status(200).json({notes: noteUser.notes, message: {msgBody: "Success", error: false}});
  });

  
})



router.post('/', async (req, res) => {
  const token = req.cookies.access_token;

  if(!token){
    return res.status(401).json({message: {msgBody: "Missing auth token", error: true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if(err){
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    }
    
    /////////////////////////
    //commented code used to save individual notes in a seperate mongoDB collection and in array of user document as well. This has been changed to - note being saved only in user document array

    // const note = new Note(req.body);
    // note.save(async err => {
    //   if(err){
    //     console.log(err);
    //     return res.status(500).json({message: {msgBody: "Server error has occured", error:true}});
    //   }

    //   const noteUser = await User.findOne({username: user.username});
    //   noteUser.notes.push(note);
    //   noteUser.save(err => {
    //     if(err) 
    //       return res.status(500).json({message: { msgBody: "Server error has occured", error: true}});

    //     res.status(201).json({message: {msgBody: "Successfully created note", error:false}});
    //   })
    // })

    ///////////////////////

    const note = new Note(req.body);
    const noteUser = await User.findOne({username: user.username});
    noteUser.notes.push(note);
    noteUser.save(err => {
      if(err) 
        return res.status(500).json({message: { msgBody: "Server error has occured", error: true}});
      res.status(201).json({message: {msgBody: "Successfully created note", error:false}});
    });
  })

})

router.delete('/delete/:key', (req, res) => {

  const token = req.cookies.access_token;

  if(!token){
    return res.status(401).json({message: {msgBody: "Missing auth token", error: true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if(err){
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    }

    const noteUser = await User.findOne({username: user.username});

    let note = await noteUser.notes.find(note => note._id == req.params.key);
    if(!note)
      return res.status(400).json({message: {msgBody: "bad request - note not found for deletion", error:true}});

    let noteIndex = await noteUser.notes.indexOf(note);
    noteUser.notes.splice(noteIndex, 1);

    noteUser.save(err => {
      if(err)
        return res.status(500).json({message: { msgBody: "Server error has occured", error: true}});

      res.status(200).json({message: {msgBody: "Note deleted", error:false}});
    })
  });
})

module.exports = router;