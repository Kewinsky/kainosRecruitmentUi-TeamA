var axios = require('axios');
 var MockAdapter = require('axios-mock-adapter');
 var chai = require('chai');
 const expect = chai.expect;
 const KainosService = require('../../../app/interface');
const comp = {
  category: "Effective meetings",
  decription: "Consistently prepared for meetings and effectively managesown diary for preparation and an agenda is set in advance. A ctively seeks inputfrom colleagues and challenges others where appropriate.",

}

describe('KainosService', function () {
  describe('getCompetencies', function (){
    it('should return competencies from axios', async () => {
        var mock = new MockAdapter(axios);
        const data = comp;
        mock.onGet(KainosService.URL).reply(200, data);

        var result = await KainosService.getCompetencies(4);
        expect(comp.description).to.equal(result.description);
      })

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(KainosService.URL).reply(500);

      try {
        var error = await KainosService.getCompetencies(-1);
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })

    it('should throw exception 404 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(KainosService.URL).reply(404);

      try{
        var error = await KainosService.getCompetencies();
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  })
})
