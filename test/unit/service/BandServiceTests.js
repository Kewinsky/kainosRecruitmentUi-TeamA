var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const apiInterface = require('../../../app/apiInterface')
const band = { roleName: 'Principle Architect', bandName: 'principal' }
const bandName = { bandName: 'principal' }
URL = '/api/viewBandLevel/'

/* globals describe, it */
describe('interface', function () {
  describe('viewBandLevel', function () {
    it('should return band level from response', async () => {
      var mock = new MockAdapter(axios)
      const data = [band]
      mock.onGet(apiInterface.URL).reply(200, data)

      var results = await apiInterface.viewBandLevel()

      expect(results[0]).to.deep.equal(band)

    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)

        mock.onGet(apiInterface.URL).reply(500)

        var error = await apiInterface.viewBandLevel()

        expect(error.message).to.equal('Could not get band')
      })
  })

  describe('getBandLevelNames', function () {
    it('should return band level from response', async () => {
      var mock = new MockAdapter(axios)
      const data = [bandName]
      mock.onGet(apiInterface.URL).reply(200, data)
      var results = await apiInterface.getBandLevelNames()
      expect(results[0]).to.deep.equal(bandName)

    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)
        mock.onGet(apiInterface.URL).reply(500)
        var error = await apiInterface.getBandLevelNames()
        expect(error.message).to.equal('Could not get band names')
      })
  })
})
