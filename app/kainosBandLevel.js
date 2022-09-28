const axios = require('axios');

exports.viewBandLevel = async () => {
    const response = await axios.get('http://localhost:8080/api/viewBandLevel');

        console.log(response.data)
        return response.data;
}