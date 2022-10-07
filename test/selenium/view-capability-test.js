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

describe('UI Testing for Capability', () => {
    it('Should display the title from job roles webpage', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open specify webpage
        driver.get(jobRoleUrl);
        // Compare expected title with actual title
        expect(await driver.findElement(By.id('jobRolesTitle')).getText()).to.equal('Job Roles Report');

        // Close browser
        await driver.quit();
    })

   it('Should display a table showing all the capability associated with job role', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Open specify webpage
       driver.get(jobRoleUrl);
        // Compare expected role name with actual role name for the first entry
        expect(await driver.findElement(By.id('jobSpecRoleID-1')).getText()).to.equal('Data Analyst');
        // Compare the capability associated with the job role for the first entry
        expect(await driver.findElement(By.id('capabilityID-1')).getText()).to.equal('Data & AI');

        // Close browser
       await driver.quit();
   })

  it('Should be able to go back onto the Homepage via back button', async() => {
      var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

      // Open specify webpage
      driver.get(jobRoleUrl);

       // Find the back button on job roles page and click to go back to homepage
       expect(await driver.findElement(By.linkText('Back')).click());

       // Close browser
      await driver.quit();
  })
})