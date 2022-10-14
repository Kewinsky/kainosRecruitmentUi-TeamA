var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')

const expect = chai.expect
const apiInterface = require('../../../app/apiInterface')
const training = {
  bandName: 'principal',
  trainingName: 'Having Courageous Conversations',
  trainingDate: '2022-11-17',
  durationHours: '3.0',
  registration: 'Please complete a JIRA request',
  category: 'Professional Skills'
}

/* globals describe, it */
describe('interface', function () {
  describe('getTraining', function () {
    it('should return training from axios', async () => {
      var mock = new MockAdapter(axios)
      const data = training
      mock.onGet(apiInterface.URL).reply(200, data)

      var result = await apiInterface.getTraining(1)
      console.log(result[1])
      expect(training.specification).to.equal(result.specification)
    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)
        mock.onGet(apiInterface.URL).reply(500)

        try {
          var error = await apiInterface.getTraining(-1)
        } catch (e) {
          expect(e.message).to.equal(
            'An error occurred while executing this request')
        }
      })

    it('should throw exception 404 error returned from axios', async () => {
      var mock = new MockAdapter(axios)
      mock.onGet(apiInterface.URL).reply(404)

      try {
        var error = await apiInterface.getTraining()
      } catch (e) {
        expect(e.message).to.equal('Bad request')
      }
    })
  })
})
