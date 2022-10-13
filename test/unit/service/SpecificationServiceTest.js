var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  

const expect = chai.expect;
const interface = require('../../../app/interface');
const role = {
  roleName: "Data Analyst",
  specification: "As a Data Analyst (Associate) in Kainos, you’ll be responsible for matching the needs of data insight with understanding of the available data. Data analysts work closely with customers to produce insight products including reports, dashboards and visualisations but also contribute to project understanding of existing data structures so that inputs and outputs are fully understood.",
  link: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?OR=Teams%2DHL&CT=1664288844676&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyOC8yMjA3MzEwMTAwNyIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&id=%2Fpeople%2FJob%20Specifications%2FData%2FJob%20profile%20%2D%20Data%20Analyst%20%28As%29%2Epdf&viewid=4ad66b2c%2D695f%2D4d2b%2D9622%2D07ad809bd9a9&parent=%2Fpeople%2FJob%20Specifications%2FData",
  bandID: 5,
  capabilityID: 1
}

describe('interface', function () {
  describe('getJobRole', function (){
    it('should return job specification from axios', async () => {
        var mock = new MockAdapter(axios);
        const data = role;
        mock.onGet(interface.URL).reply(200, data);

        var result = await interface.getJobRole(1);
        expect(role.specification).to.equal(result.specification);
      })

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(interface.URL).reply(500);

      try{
        var error = await interface.getJobRole(-1);
      }catch(e){
        expect(e.message).to.equal('An error occurred while executing this request')
      }
    })

    it('should throw exception 404 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(interface.URL).reply(404);

      try{
        var error = await interface.getJobRole();
      }catch(e){
        expect(e.message).to.equal('Bad request')
      }
    })
  })
})