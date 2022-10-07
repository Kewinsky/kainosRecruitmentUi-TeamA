const express = require('express')
const router = express.Router()
const interface = require('./interface.js')
var Url = process.env.LOCAL_URL
router.get('/job-specification/:id', async (req, res) => {
    var result = await interface.getJobRole(req.params.id)
    res.render('view-specification.html', {
        jobRole: result,
        url:Url
     })});
    
router.get('/view-jobRoles', async (req, res) => {
    var result = await interface.getJobRoles()
    var response = await interface.viewBandLevel()
    var results = await interface.getCapbilities()
    res.render('view-jobRoles', {
        jobRoles: result,
        bandLevel:response,
        capabilities: results,
        url:Url
    })});
    
router.get('/view-band-info/:id', async (req, res) => {
    var result = await interface.getTraining(req.params.id)
    var results = await interface.viewBandLevel()
    var response = await interface.getCompetencies(req.params.id)
    res.render('view-band-info.html', {
        training: result,
        bandLevel: results,
        competencies: response,
        url:Url
    })});
    
router.get('/view-matrix/:id', async (req, res) => {
    var jobs = await interface.getJobRolesByCapability(req.params.id)
    var bands = await interface.getBandLevelNames()

    if (req.params.id == 1)
    {
        res.render('view-dataAndAi-matrix', {
            jobRoles: jobs,
            bandLevels: bands,
            url:Url
        })
    }
    else if (req.params.id == 2)
    {
        res.render('view-engineering-matrix', {
            jobRoles: jobs,
            bandLevels: bands,
            url:Url
        })
    }
    });

module.exports = router