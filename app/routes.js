const express = require('express')
const router = express.Router()
const interface = require('./interface.js')
var Url = process.env.LOCAL_URL
router.get('/job-specification/:id', async (req, res) => {
    var result = await interface.getJobRole(req.params.id)
    res.render('view-specification.html', {
        jobRole: result
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
    
router.get('/view-matrix', async (req, res) => {
    var caps = await interface.getCapabilitiesNames()
    res.render('view-matrix', {
        capabilities: caps,
    })});

router.get('/view-matrix/:id', async (req, res) => {
    var jobs = await interface.getJobRolesByCapability(req.params.id)
    var bands = await interface.getBandLevelNames()

    if (req.params.id == 1)
    {
        res.render('view-dataAndAi-matrix', {
            jobRoles: jobs,
            bandLevels: bands
        })
    }
    else if (req.params.id == 2)
    {
        res.render('view-engineering-matrix', {
            jobRoles: jobs,
            bandLevels: bands
        })
    }
    });

module.exports = router