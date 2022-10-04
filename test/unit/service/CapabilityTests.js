var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const KainosService = require('../../../app/interface');
const capability = {
    roleName: "Workday AMS Recruiting Consultant",
    capabilityName: "Workday"
}

describe('KainosService', function () {
    describe('getCapabilities', function () {
      it('should return capabilities from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [capability];

        mock.onGet(KainosService.URL).reply(200, data);

        var results = await KainosService.getCapbilities();

        expect(results[0]).to.deep.equal(capability)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(KainosService.URL).reply(500);

        var error = await KainosService.getCapbilities()
        
        expect(error.message).to.equal('Could not return Capabilities')
      })
    })
  })