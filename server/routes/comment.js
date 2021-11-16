const express = require('express');
const router = express.Router();

const {Comment} = require("../models/Comment");


//=================================
//            Comment
//=================================

router.post('/saveComment', (req, res) => {
    console.log(req.body)
    const comment = new Comment(req.body)
    comment.save((err, comment)=>{
        if(err) return res.json({success: false, err});
        Comment.find({'_id' : comment._id})
        .populate('writer')
        .exec((err, result)=>{
            if(err) return res.json({success: false, err});
            res.status(200).json({success: true, result})
        })
    })
})

router.post('/getComments', (req, res) => {

    Comment.find({ "postId" : req.body.videoId})
    .populate('writer')
    .exec((err, comments) =>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, comments})
    })
})

router.post('/RemoveComment', (req, res) => {
    console.log(req.body)
    Comment.findOneAndDelete({'_id': req.body.responseTo})
    .exec((err, result)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, result})
    })
})
module.exports = router;
