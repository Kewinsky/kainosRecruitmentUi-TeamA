const axios = require('axios');


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



