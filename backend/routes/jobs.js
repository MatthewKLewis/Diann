const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Job = require('../models/job.model')

//CREATE
router.post('/create', (req, res, next)=>{
    let newJob = new Job({
        name: req.body.name,
        date: req.body.date,
        userId: req.body.userId,
    });
    newJob.save().then((data)=>{
        res.json(data);
    })
})

//READ
router.get('/all/:userId', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Job.find({userId: req.params.userId}).then((jobs)=>{
        res.json(jobs)
    })
})

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Job.findById(req.params.id).then((job)=>{
        res.json(job)
    })
})

//UPDATE


//DESTROY
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Job.findByIdAndDelete(req.params.id).then((job)=>{
        res.json(job)
    })
})

module.exports = router;