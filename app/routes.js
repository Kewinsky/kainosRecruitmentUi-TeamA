const express = require('express')
const router = express.Router()
const interface = require('./interface.js')
const capability = require('./interface.js')
const viewBandLevel = require('./kainosBandLevel.js')

router.get('/view-capabilities', async (req, res) => {
    var result = await capability.getCapbilities()
    res.render('view-capabilities', {
    capabilities: result
    })});

 router.get('/viewBandLevel', async (req, res) => {
     response = await viewBandLevel.viewBandLevel()
     console.log(response);
     res.render('viewBandLevel', {bandLevel:response } );
   });

module.exports = router
