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
var jobSpecUrl = baseUrl.concat('/job-specification/1');

describe('UI Testing for Job Specification Webpage', () => {
    it('Should display the title from job roles webpage', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open job spec webpage
        driver.get(jobSpecUrl);
        // Compare expected title with actual title
        expect(await driver.findElement(By.id('jobSpecificationTitle')).getText()).to.equal('Job Specification');

        // Close browser
        await driver.quit();
    })

    it('Should display the name of the role', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open job spec webpage
        driver.get(jobSpecUrl);
        // Compare expected title with actual title for role ID 1
        expect(await driver.findElement(By.id('jobRoleName')).getText()).to.equal('Data Analyst');

        // Close browser
        await driver.quit();
    })

    it('Should display the specification for that role', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        var specificationTxt = "As a Data Analyst (Associate) in Kainos, you’ll be responsible for matching the needs of data insight with understanding of the available data. Data analysts work closely with customers to produce insight products including reports, dashboards and visualisations but also contribute to project understanding of existing data structures so that inputs and outputs are fully understood.";
        // Open job roles webpage
        driver.get(jobSpecUrl);
        // Compare expected title with actual title
        expect(await driver.findElement(By.id('specTextId')).getText()).to.equal(specificationTxt);

        // Close browser
        await driver.quit();
    })

  it('Should be able to go back onto the job role page via back button', async() => {
      var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

      // Open job spec webpage
      driver.get(jobSpecUrl);

       // Find the back button on job roles page and click to go back to homepage
       expect(await driver.findElement(By.linkText('Back')).click());

       // Close browser
       await driver.quit();
  })
})