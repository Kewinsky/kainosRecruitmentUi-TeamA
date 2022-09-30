const axios = require('axios');

exports.getJobRole = async (id) => { 
      try {  
        const jobRoleResponse = await axios.get('http://localhost:8080/api/job-specification/' + id)
        console.log(jobRoleResponse.data)
        return jobRoleResponse.data;
      } catch (e) {
         return new Error('Could not get job role')
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
        return new Error('Could not return Capabilities')

    }
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
exports.viewBandLevel = async () => {
    const response = await axios.get('http://localhost:8080/api/viewBandLevel');

        console.log(response.data)
        return response.data;
}



