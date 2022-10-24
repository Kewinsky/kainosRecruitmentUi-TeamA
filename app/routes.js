const express = require('express')
const router = express.Router()
const Url = process.env.LOCAL_URL
const apiInterface = require('./apiInterface.js')
const AddJobRoleValidator = require('./validator/AddJobRoleValidator.js')
const db = require('./db-config.js')
const auth = require('./authorization.js')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

router.use(cookieParser())

db.connect((error) => {
  if (error) {
    throw error
  }
  console.log('Connected to the database successfully!')
})

router.post('/auth', async (req, res) => {
  const { email, password } = req.body

  const user = db.query('SELECT * FROM team_A.users WHERE email = ?', [email],
    function (error, results, fields) {
      if (results.length > 0) {
        const data = JSON.parse(JSON.stringify(results))
        if (data[0].email != email || data[0].password != password) {
          return res.status(400).json(
            { status: 'error', error: 'Invalid email or password!' })
        } else {
          const token = jwt.sign({ email: email, password: password },
            process.env.JWT_SECRET)
          res
            .cookie('access_token', token, {
            // httpOnly: true,
            })
            .status(200)
            .json({ status: 'success', message: 'Logged in successfully' })
        }
      } else {
        return res.status(400).json(
          { status: 'error', error: 'User does not exist' })
      }
    })
})

router.get('/logout', auth, (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .render('logout')
})

router.get('/job-specification/:id', async (req, res) => {
  var result = await apiInterface.getJobRole(req.params.id)
  res.render('view-specification.html', {
    jobRole: result,
    url: Url
  })
})

router.get('/view-jobRoles', auth, async (req, res) => {
  var result = await apiInterface.getJobRoles()
  var response = await apiInterface.getBandLevelNames()
  var results = await apiInterface.getCapabilitiesNames()
  res.render('view-jobRoles', {
    jobRoles: result,
    bandLevel: response,
    capabilities: results,
    url: Url
  })
})

router.get('/datatable', auth, async (req, res) => {
  var result = await apiInterface.getJobRoles()
  var response = await apiInterface.getBandLevelNames()
  var results = await apiInterface.getCapabilitiesNames()
  res.render('datatable.html', {
    jobRoles: result,
    bandLevel: response,
    capabilities: results,
    url: Url
  })
})

router.get('/view-jobRoles-Edit', async (req, res) => {
  var result = await apiInterface.getJobRoles()
  var response = await apiInterface.getBandLevelNames()
  var results = await apiInterface.getCapabilitiesNames()
  res.render('view-job-roles-with-edit', {
    jobRoles: result,
    bandLevel: response,
    capabilities: results,
    url: Url
  })
})

router.get('/view-band-info/:id', async (req, res) => {
  var result = await apiInterface.getTraining(req.params.id)
  var results = await apiInterface.viewBandLevel()
  var response = await apiInterface.getCompetencies(req.params.id)
  res.render('view-band-info.html', {
    training: result,
    bandLevel: results,
    competencies: response,
    url: Url
  })
})

router.get('/gender-bias-result', async (req, res) => {
  var genderBias = await apiInterface.getGenderBias(
    req.session.data['gender-bias'])
  res.render('predict-gender-bias.html', {
    biasInfo: genderBias
  })
})

router.get('/view-matrix/:id', async (req, res) => {
  var jobs = await apiInterface.getJobRolesByCapability(req.params.id)
  var bands = await apiInterface.getBandLevelNames()
  var capabilities = await apiInterface.getCapabilitiesNames()
  res.render('view-matrix', {
    jobRoles: jobs,
    bandLevels: bands,
    capabilities: capabilities,
    url: Url
  })
})

router.get('/view-jobRoles-delete', async (req, res) => {
  var result = await apiInterface.getJobRoles()
  var response = await apiInterface.getBandLevelNames()
  var results = await apiInterface.getCapabilitiesNames()
  res.render('view-jobRolesDelete', {
    jobRoles: result,
    bandLevel: response,
    capabilities: results,
    url: Url
  })
})

router.get('/roles-to-delete', async (req, res) => {
  var output = await apiInterface.deleteJobRoles(req.session.data.id)
  res.redirect('/view-jobRoles')
})

router.post('/add-job-roles', async (req, res) => {
  try {
    if (AddJobRoleValidator.validateUserInput(req.body)) {
      const jobRole = req.body
      console.log(jobRole.bandID)
      jobRole.bandID = parseInt(jobRole.bandID)
      jobRole.capabilityID = parseInt(jobRole.capabilityID)
      data = await apiInterface.addJobRole(req.body)
      const success = 'New job role added'
      res.locals.success = success
      res.render('add-new-role', {
        url: Url
      })
    }
  } catch (e) {
    res.locals.errormessage = e.message
    res.render('add-new-role', req.body)
  }
})

router.get('/edit-job-role/:id', async (req, res) => {
  var result = await apiInterface.getJobRole(req.params.id)
  var cap
  var capCheck1; var capCheck2 = false
  var bandCheck1; var bandCheck2; var bandCheck3; var bandCheck4; var bandCheck5
  var bandCheck6 = false
  var band
  var id = req.params.id

  if (result.capabilityID === 1) {
    cap = 'Data & AI'
    capCheck1 = true
  } else {
    cap = 'Engineering'
    capCheck2 = true
  }
  if (result.bandID === 1) {
    band = 'Principal'
    bandCheck1 = true
  }
  if (result.bandID === 2) {
    band = 'Manager'
    bandCheck2 = true
  }
  if (result.bandID === 3) {
    band = 'Consultant'
    bandCheck3 = true
  }
  if (result.bandID === 4) {
    band = 'Senior Associate'
    bandCheck4 = true
  }
  if (result.bandID === 5) {
    band = 'Associate'
    bandCheck5 = true
  }
  if (result.bandID === 6) {
    band = 'Trainee'
    bandCheck6 = true
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
    url: Url
  })
})

router.post('/edit-job-role/:id', async (req, res) => {
  var result = await apiInterface.getJobRole(req.params.id)
  try {
    const id = await apiInterface.createJobWithoutLink(req.params.id, req.body)
    res.redirect('/view-jobRoles')
  } catch (e) {
    errormessage = 'Failed to submit form'
    var result = await apiInterface.getJobRole(req.params.id)
    var cap
    var capCheck1 = false
    var capCheck2 = false
    var band
    var id = req.params.id

    if (result.capabilityID === 1) {
      cap = 'Data & AI'
      capCheck1 = true
    } else {
      cap = 'Engineering'
      capCheck2 = true
    }
    if (result.bandID === 1) {
      band = 'Principal'
    }
    if (result.bandID === 2) {
      band = 'Manager'
    }
    if (result.bandID === 3) {
      band = 'Consultant'
    }
    if (result.bandID === 4) {
      band = 'Senior Associate'
    }
    if (result.bandID === 5) {
      band = 'Associate'
    }
    if (result.bandID === 6) {
      band = 'Trainee'
    }

    res.render('edit-job-role.html', {
      jobRole: result,
      cap,
      band,
      id,
      capCheck1,
      capCheck2,
      url: Url,
      errormessage
    })
  }
})

module.exports = router
