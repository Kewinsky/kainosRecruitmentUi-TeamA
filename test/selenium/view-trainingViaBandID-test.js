var chai = require('chai');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By
let service = new chrome.ServiceBuilder()
        .loggingTo('/my/log/file.txt')
        .enableVerboseLogging()
        .build();

const { assert } = require('chai');
const expect = chai.expect;
var baseUrl = 'http://localhost:3000';
var jobRoleUrl = baseUrl.concat('/view-jobRoles');
var bandInfoTrainingUrl = baseUrl.concat('/view-band-info/5');

describe('UI Testing for Training via bandID', () => {
    it('Should display the title from Band Information webpage', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open specify webpage
        driver.get(bandInfoTrainingUrl);
        // Compare expected role name with actual role name for the first entry
        expect(await driver.findElement(By.id('bandInformationTitle')).getText()).to.equal('Associate Band Information');

        // Close browser
        await driver.quit();
    })

  it('Should display a table with data containing training course given bandID', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Open specify webpage
       driver.get(bandInfoTrainingUrl);

       // Compare expected competencies name with actual competencies name for bandID 1
       expect(await driver.findElement(By.id('Training-2022-10-17')).getText()).to.equal('Enhancing your Communication Skills');

       // Close browser
       await driver.quit();
  })

  it('Should be able to go back onto the Job Roles webpage via back button', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Open specify webpage
       driver.get(bandInfoTrainingUrl);

       // Find the back button on principal band information and click to go back to job roles webpage
       expect(await driver.findElement(By.linkText('Back')).click());
       // Compare expected title with actual title on the job roles webpage
       expect(await driver.findElement(By.id('jobRolesTitle')).getText()).to.equal('Job Roles Report');

       // Close browser
       await driver.quit();
  })

  it('Should be able to go back to Band Information webpage from Job roles webpage', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Open specify webpage
       driver.get(jobRoleUrl);

       // Click on the first band level from job roles webpage
       expect(await driver.findElement(By.id('bandID-1')).click());
       // Compare expected title with actual title on the band information webpage
       expect(await driver.findElement(By.id('bandInformationTitle')).getText()).to.equal('Associate Band Information');

       // Close browser
       await driver.quit();
  })
})