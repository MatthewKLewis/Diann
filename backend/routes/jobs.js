const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Job = require('../models/job.model')

//CREATE
router.post('/create', (req, res, next)=>{
    let newMap = new Map({
        name: req.body.name,
        userId: req.body.userId,
    });
    newMap.save()
})

//READ
router.get('/all', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Map.find().then((jobs)=>{
        res.json(jobs)
    })
})

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Map.findById(req.params.id).then((job)=>{
        res.json(job)
    })
})

//UPDATE


//DESTROY


module.exports = router;