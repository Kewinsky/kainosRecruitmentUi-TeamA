var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');

const expect = chai.expect;
const interface = require('../../../app/interface');
const comp = {
  category: "Effective meetings",
  decription: "Consistently prepared for meetings and effectively managesown diary for preparation and an agenda is set in advance. A ctively seeks inputfrom colleagues and challenges others where appropriate.",

}

describe('interface', function () {
  describe('getCompetencies', function (){
    it('should return competencies from axios', async () => {
        var mock = new MockAdapter(axios);
        const data = comp;
        mock.onGet(interface.URL).reply(200, data);

        var result = await interface.getCompetencies(4);
        console.log(result[1]);
        expect(comp.description).to.equal(result.description);
      })

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(interface.URL).reply(500);

      try {
        var error = await interface.getCompetencies(-1);
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })

    it('should throw exception 404 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(interface.URL).reply(404);

      try{
        var error = await interface.getCompetencies();
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  })
})
