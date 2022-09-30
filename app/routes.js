const express = require('express')
const router = express.Router()
const interface = require('./interface.js')
const capability = require('./interface.js')


router.get('/view-capabilities', async (req, res) => {
    var result = await capability.getCapbilities()
    res.render('view-capabilities', {
    capabilities: result
    })});


 router.get('/viewBandLevel', async (req, res) => {
     response = await interface.viewBandLevel()
     console.log(response);
     res.render('viewBandLevel', {bandLevel:response } );
   });


router.get('/job-specification/:id', async (req, res) => {
    var result = await interface.getJobRole(req.params.id)
    res.render('view-specification.html', {
        jobRole: result
    })});
    
router.get('/view-jobRoles', async (req, res) => {
    var result = await interface.getJobRoles()
    res.render('view-jobRoles', {
        jobRoles: result
    })});
    

module.exports = router
