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
    

module.exports = router
