var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')

const expect = chai.expect
const apiInterface = require('../../../app/apiInterface')
const comp = {
  category: 'Effective meetings',
  decription: 'Consistently prepared for meetings and effectively managesown diary for preparation and an agenda is set in advance. A ctively seeks inputfrom colleagues and challenges others where appropriate.',

}

/* globals describe, it */
describe('interface', function () {
  describe('getCompetencies', function () {
    it('should return competencies from axios', async () => {
      var mock = new MockAdapter(axios)
      const data = comp
      mock.onGet(apiInterface.URL).reply(200, data)

      var result = await apiInterface.getCompetencies(4)
      expect(comp.description).to.equal(result.description)
    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)
        mock.onGet(apiInterface.URL).reply(500)

        try {
          var error = await apiInterface.getCompetencies(-1)
        } catch (e) {
          expect(e.message).to.equal(
            'An error occurred while executing this request')
        }
      })

    it('should throw exception 404 error returned from axios', async () => {
      var mock = new MockAdapter(axios)
      mock.onGet(apiInterface.URL).reply(404)

      try {
        var error = await apiInterface.getCompetencies()
      } catch (e) {
        expect(e.message).to.equal('Bad request')
      }
    })
  })
})
