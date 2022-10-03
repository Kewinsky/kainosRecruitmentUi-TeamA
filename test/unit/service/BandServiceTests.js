var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const interface = require('../../../app/interface');
const band =  { roleName: 'Principle Architect', bandName: 'principal' }
URL = '/api/viewBandLevel/'
describe('interface',function(){
    describe('viewBandLevel',function(){
        it('should return band level from response', async() =>{
            var mock = new MockAdapter(axios);
            const data = [band];
            mock.onGet(interface.URL).reply(200, data);

            var results = await interface.viewBandLevel();

            expect(results[0]).to.deep.equal(band)

        })

         it('should throw exception when 500 error returned from axios', async () => {
                var mock = new MockAdapter(axios);

                mock.onGet(interface.URL).reply(500);

                var error = await interface.viewBandLevel();


                expect(error.message).to.equal('Could not get band')
              })
    })
})
