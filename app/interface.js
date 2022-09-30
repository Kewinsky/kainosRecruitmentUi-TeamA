const axios = require('axios');

exports.getJobRole = async (id) => { 
      try {  
        const jobRoleResponse = await axios.get('http://localhost:8080/api/job-specification/' + id)
        console.log(jobRoleResponse.data)
        return jobRoleResponse.data;
      } catch (e) {
        if(e.response.status == 500){
            return new Error('Could not get job specification')
       }
       return new Error('Could not get job specification')
      }
  }

exports.getCapbilities = async () => {
    let Capabilities = []

    try {
        const viewCapabalility = await axios.get('http://localhost:8080/api/viewCapabilities')
        console.log(viewCapabalility.data)
        return viewCapabalility.data;

    }
    catch(e) {
        console.log(e);
    }
    return("Could not return Capabilities")
}
exports.getJobRoles = async () => {
    let job_roles = []
    
    try {
        const viewJobRoles = await axios.get('http://localhost:8080/api/job-roles')
        console.log(viewJobRoles.data)
        return viewJobRoles.data;

    }
    catch(e) {
        console.log(e);
    }
    return("Could not return roles")
}



