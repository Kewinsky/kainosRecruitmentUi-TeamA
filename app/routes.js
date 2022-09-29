const express = require('express')
const router = express.Router()

const capability = require('./interface.js')
const job_role = require('./interface.js')

// Add your routes here - above the module.exports line
router.get('/view-capabilities', async (req, res) => {
    var result = await capability.getCapbilities()
    res.render('view-capabilities', {
    capabilities: result
    })});

router.get('/job-specification/:id', async (req, res) => {
    var result = await interface.getJobRole(req.params.id)
    res.render('job-specification.html', {
        jobRole: result
    })});
    
router.get('/view-jobRoles', async (req, res) => {
    var result = await job_role.getJobRoles()
    res.render('view-jobRoles', {
    job_roles: result
    })});
    
module.exports = router
