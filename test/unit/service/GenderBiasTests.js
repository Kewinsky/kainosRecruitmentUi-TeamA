var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const genderBiasService = require('../../../app/apiInterface')
const bias = {
  percentage_bias: '33.3%',
  biased_words_male: ['Man, Male, He'],
  biased_words_female: ['She, Her, Female']
}

/* globals describe, it */
describe('interface', function () {
  describe('getGenderBias', function () {
    it('should return the gender bias from response', async () => {
      var mock = new MockAdapter(axios)

      const data = [bias]

      mock.onGet(genderBiasService.URL).reply(200, data)

      var results = await genderBiasService.getCapabilities()

      expect(results[0]).to.deep.equal(bias)
    })

    it('should throw exception when 500 error returned from axios',
      async () => {
        var mock = new MockAdapter(axios)

        mock.onGet(genderBiasService.URL).reply(500)

        var error = await genderBiasService.getGenderBias()

        expect(error.message).to.equal(
          'Could not return the gender bias. Please try again.')
      })
  })
})