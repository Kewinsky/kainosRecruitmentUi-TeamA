const express = require('express')
const router = express.Router()
const Url = process.env.LOCAL_URL
const interface = require('./interface.js')
const db = require('./db-config.js')
const auth = require("./authorization.js");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");

router.use(cookieParser());

db.connect((error) => {
    if (error) throw error;
    console.log("Connected to the database successfully!")
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    const user = db.query("SELECT * FROM team_A.users WHERE email = ?", [email], function(error,results,fields){
        if(results.length > 0){
            const data = JSON.parse(JSON.stringify(results))
            if (data[0].email != email || data[0].password != password) {
                return res.status(400).json({status: "error", error: "Invalid email or password!"})
            } else {
                const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET);
                res
                    .cookie("access_token", token, {
                        // httpOnly: true,
                    })
                    .status(200)
                    .json({status: "success", message: "Logged in successfully" })
            }
        }
        else {
            return res.status(400).json({status: "error", error: "User does not exist" });
        }
    });
});

router.get('/profile', auth, (req, res) => {
    res.json({  email: req.email, password: req.password });
});

router.get("/logout", auth, (req, res) => {
return res
    .clearCookie("access_token")
    .status(200)
    .render('logout')
});

router.get('/job-specification/:id', async (req, res) => {
    var result = await interface.getJobRole(req.params.id)
    res.render('view-specification.html', {
        jobRole: result,
        url:Url 
    })});

router.get('/view-jobRoles', auth, async (req, res) => {
    var result = await interface.getJobRoles()
    var response = await interface.getBandLevelNames()
    var results = await interface.getCapabilitiesNames()
    res.render('view-jobRoles', {
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

module.exports = router
