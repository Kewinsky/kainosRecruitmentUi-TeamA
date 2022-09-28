const axios = require('axios');

exports.getJobRole = async () => { 
      try {  
        const jobRoleResponse = await axios.get('http://localhost:8080/api/job-specification/1')
        console.log(jobRoleResponse.data)
        return jobRoleResponse.data;
      } catch (e) {
         return new Error('Could not get job role')
      }
  }

exports.getCapbilities = async () => {
    let Capabilities = []
    try{
        const viewCapabalility = await axios.get('http://localhost:8080/api/viewCapabilities')
        console.log(viewCapabalility.data)
        return viewCapabalility.data;

    }
    catch(e) {
        console.log(e);

    }
    return("Could not return Capabilities")
}



