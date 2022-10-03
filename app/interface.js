const axios = require('axios');

exports.getJobRole = async (id) => { 
      try {  
        const jobRoleResponse = await axios.get('http://localhost:8080/api/job-specification/' + id)
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
exports.viewBandLevel = async () => {
    try{
        const response = await axios.get('http://localhost:8080/api/viewBandLevel');
        console.log(response.data)
        return response.data;

    }
    catch (e) {
         return new Error('Could not get band')
     }
}



