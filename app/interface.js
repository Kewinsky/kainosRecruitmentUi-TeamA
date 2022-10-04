const axios = require('axios');

var HOST = process.env.HOST

exports.getJobRole = async (id) => { 
      try {  
        const jobRoleResponse = await axios.get(HOST + '/api/job-specification/' + id)
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
        const dotenv = require('dotenv');
        dotenv.config();
        const viewCapabalility = await axios.get(HOST + '/api/viewCapabilities')
        console.log(viewCapabalility.data)
        return viewCapabalility.data;

    }
    catch(e) {
        return new Error('Could not return Capabilities')

    }
}
exports.getJobRoles = async () => {
    let job_roles = []
    
    try {
        const viewJobRoles = await axios.get(HOST + '/api/job-roles')
        console.log(viewJobRoles.data)
        return viewJobRoles.data;

    }
    catch(e) {
        console.log(e);
    }
    return("Could not return roles")
}
exports.viewBandLevel = async () => {
    const response = await axios.get(HOST +  '/api/viewBandLevel');

        console.log(response.data)
        return response.data;
}



