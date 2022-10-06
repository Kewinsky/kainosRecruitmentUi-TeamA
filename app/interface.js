const axios = require('axios');
const bandLevel = require('./config');
var Url = process.env.URL
exports.getJobRole = async (id) => { 
      try {  
        const jobRoleResponse = await axios.get(Url + "job-specification/" + id)
        console.log(jobRoleResponse.data)
        return jobRoleResponse.data;
      } catch (e) {
        if(e.response === undefined){
            throw new Error("Undefined error has occurred")
        }
        else if(e.response.status === 500){
            throw new Error("An error occurred while executing this request")
        }
        else if(e.response.status === 404){
            throw new Error("Bad request")
        }
      }
  }

exports.getCapbilities = async () => {
    let Capabilities = []

    try {
        const viewCapabalility = await axios.get(Url + "viewCapabilities")
        console.log(viewCapabalility.data)
        return viewCapabalility.data;

    }
    catch(e) {
        console.log(e);
         return new Error('Could not return Capabilities')
    }
}

exports.getCapabilitiesNames = async () => {
    let BandLevels = []

    try {
        const viewBandLevel = await axios.get(Url + 'viewCapabilitiesNames')
        console.log(viewBandLevel.data)
        return viewBandLevel.data;

    }
    catch(e) {
        console.log(e);
         return new Error('Could not return capabilitie names')
    }
}

exports.getJobRoles = async () => {
    let job_roles = []
    
    try {
        const viewJobRoles = await axios.get(Url+"job-roles")
        console.log(viewJobRoles.data)
        return viewJobRoles.data;

    }
    catch(e) {
        console.log(e);

    }
    return("Could not return roles")
}

exports.getJobRolesByCapability = async (id) => {
    let job_roles = []
    
    try {
        const viewJobRoles = await axios.get(Url + 'job-roles-by-capability/' + id)
        console.log(viewJobRoles.data)
        return viewJobRoles.data;

    }
    catch(e) {
        console.log(e);
    }
    return("Could not return roles")
}

exports.viewBandLevel = async () => {
    try{
        const response = await axios.get(Url + "viewBandLevel");
        console.log(response.data)
        return response.data;

    }
    catch (e) {
         return new Error('Could not get band')
    }
}

exports.getBandLevelNames = async () => {
    let BandLevels = []

    try {
        const viewBandLevel = await axios.get(Url + 'viewBandLevelNames')
        console.log(viewBandLevel.data)
        return viewBandLevel.data;

    }
    catch (e) {
        return new Error('Could not get band names')
    }
}

