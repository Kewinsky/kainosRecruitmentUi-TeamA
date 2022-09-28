const express = require('express')
const router = express.Router()
const interface = require('./interface.js')
const capability = require('./interface.js')

// Add your routes here - above the module.exports line
router.get('/view-capabilities', async (req, res) => {
    var result = await capability.getCapbilities()
    res.render('view-capabilities', {
    capabilities: result
    })});

router.get('/job-specification', async (req, res) => {
    var result = await interface.getJobRole()
    res.render('job-specification.html', {
        jobRole: result
    })});

module.exports = router
