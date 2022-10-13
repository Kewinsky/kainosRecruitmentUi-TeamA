var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const interface = require('../../../app/interface');
const band =  { roleName: 'Principle Architect', bandName: 'principal' }
const bandName =  { bandName: 'principal' }
const jobRole = { roleName: 'Principle Architect',specification: "Test Spec", responsibility:"Test responsibility", bandID:1, capabilityID:2}
URL = '/api/viewBandLevel/'
URL2 = 'api/editJobRole/'
const id =58
describe('interface',function(){
    describe('edit-job-roles',function(){
        it('should return success if a job roles is successfully changed', async() =>{
            var mock = new MockAdapter(axios);
            const data = [band];
            mock.onPut(interface.URL2).reply(200, "Data updated successfully");

            var results = await interface.createJobWithoutLink(58,jobRole);

            expect(results).to.deep.equal(200)

        })

         it('should throw exception when 500 error returned from axios', async () => {
                var mock = new MockAdapter(axios);

                mock.onPut(interface.URL2).reply(500);

                var error = await interface.createJobWithoutLink(58,jobRole);


                expect(error.message).to.equal('Could not edit employee')
              })

              it('should throw exception when 400 error returned from axios', async () => {
                              var mock = new MockAdapter(axios);

                              mock.onPut(interface.URL2).reply(400);

                              var error = await interface.createJobWithoutLink(58,jobRole);


                              expect(error.message).to.equal('Invalid data')
              })

              it('should throw exception when 500 error returned from axios', async () => {
                   var mock = new MockAdapter(axios);

                    mock.onPut(interface.URL2).reply(404);

                    var error = await interface.createJobWithoutLink(58,jobRole);

                   expect(error.message).to.equal('went wrong')
              })
    })
})
