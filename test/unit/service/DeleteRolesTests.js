var axios = require('axios');
 var MockAdapter = require('axios-mock-adapter');
 var chai = require('chai');
 const expect = chai.expect;
 const interface = require('../../../app/interface');
 const idList = {id: '142'}
 URL = 'api/delete-job-roles/'
 
 describe('interface', function () {
     describe('deleteJobRoles', function () {
       it('should return 200 from response', async () => {
         var mock = new MockAdapter(axios);

         const data = idList;

         mock.onDelete(interface.URL).reply(200);

         var results = await interface.deleteJobRoles(data);

         expect(results).to.deep.equal(200)
       })

       it('should throw exception when 500 error returned from axios', async () => {
         var mock = new MockAdapter(axios);

         mock.onDelete(interface.URL).reply(500);

         var error = await interface.deleteJobRoles()

         expect(error.message).to.equal('Could not delete these Jobs')
       })
     })
})