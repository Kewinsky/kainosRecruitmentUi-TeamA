var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const apiInterface = require('../../../app/apiInterface')
const idList = { id: '142' }
URL = 'api/delete-job-roles/'

/* globals describe, it */
describe('interface', function () {
  describe('deleteJobRoles', function () {
    it('should return 200 from response', async () => {
      var mock = new MockAdapter(axios)

      const data = idList

      mock.onDelete(apiInterface.URL).reply(200)

      var results = await apiInterface.deleteJobRoles(data)

      expect(results).to.deep.equal(200)
    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)

        mock.onDelete(apiInterface.URL).reply(500)

        var error = await apiInterface.deleteJobRoles()

        expect(error.message).to.equal('Could not delete these Jobs')
      })
  })
})