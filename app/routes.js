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
    var response = await interface.getBandLevelNames()
    var results = await interface.getCapabilitiesNames()
    res.render('view-jobRoles', {
        jobRoles: result,
        bandLevel: response,
        capabilities: results,
        url:Url
    })});


router.get('/view-jobRoles-Edit', async (req, res) => {
    var result = await interface.getJobRoles()
    var response = await interface.getBandLevelNames()
    var results = await interface.getCapabilitiesNames()
    res.render('view-job-roles-with-edit', {
        jobRoles: result,
        bandLevel: response,
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
    var capabilities = await interface.getCapabilitiesNames()
    res.render('view-matrix', {
        jobRoles: jobs,
        bandLevels: bands,
        capabilities: capabilities,
        url:Url
    })});

router.get('/edit-job-role/:id',async(req,res) => {
    var result = await interface.getJobRole(req.params.id)
    console.log(result)
       var cap;
       var capCheck1=false;
       var capCheck2=false;
       var bandCheck1=false;
       var bandCheck2=false;
       var bandCheck3=false;
       var bandCheck4=false;
       var bandCheck5=false;
       var bandCheck6=false;
       var band;
       var id = req.params.id
       if(result.capabilityID===1){
            cap = "Data & AI"
            capCheck1=true;
       }
                else{
                    cap = "Engineering"
                    capCheck2=true;
                }
    if(result.bandID===1){
        band="Principal"
        bandCheck1=true;
    }
    if(result.bandID===2){
         band="Manager"
         bandCheck2=true;
    }
     if(result.bandID===3){
          band="Consultant"
          bandCheck3=true;
     }
      if(result.bandID===4){
           band="Senior Associate"
           bandCheck4=true;
      }
      if(result.bandID===5){
           band="Associate"
           bandCheck5=true;
      }
      if(result.bandID===6){
            band="Trainee"
            bandCheck6=true;
      }

      res.render('edit-job-role.html', {
            jobRole: result,
            cap,
            band,
            id,
            capCheck2,
            capCheck1,
            bandCheck1,
            bandCheck2,
            bandCheck3,
            bandCheck4,
            bandCheck5,
            bandCheck6,
            url:Url
        })});

router.post('/edit-job-role/:id',async(req,res) => {
    var result = await interface.getJobRole(req.params.id)
    try{
        console.log("I have reached here")
        console.log(req.body)
        const id = await interface.createJobWithoutLink(req.params.id,req.body)
        res.redirect('/view-jobRoles')
    } catch(e){
        errormessage = "Failed to submit form"
        var result = await interface.getJobRole(req.params.id)
            console.log(result)
            var cap;
            var capCheck1=false;
            var capCheck2=false;
            var band;
            var id = req.params.id
            if(result.capabilityID===1){
                cap = "Data & AI"
                capCheck1=true;
            }
            else{
                cap = "Engineering"
                capCheck2=true;
            }
            if(result.bandID===1){
                band="Principal"
            }
            if(result.bandID===2){
                 band="Manager"
            }
             if(result.bandID===3){
                  band="Consultant"
             }
              if(result.bandID===4){
                   band="Senior Associate"
              }
              if(result.bandID===5){
                   band="Associate"
              }
              if(result.bandID===6){
                      band="Trainee"
              }

              res.render('edit-job-role.html', {
                    jobRole: result,
                    cap,
                    band,
                    id,
                    capCheck1,
                    capCheck2,
                    url:Url,
                    errormessage
                })


    }

});

module.exports = router
