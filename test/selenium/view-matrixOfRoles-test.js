var chai = require('chai')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const By = webdriver.By

const service = new chrome.ServiceBuilder()
  .loggingTo('/my/log/file.txt')
  .enableVerboseLogging()
  .build()

const { assert } = require('chai')
const expect = chai.expect
var baseUrl = 'http://localhost:3000'
var jobRoleUrl = baseUrl.concat('/view-jobRoles')
var DataCapabilityUrl = baseUrl.concat('/view-matrix/1')
var EngineeringCapabilityUrl = baseUrl.concat('/view-matrix/2')

/* globals describe, it */
describe('UI Testing for the matrix of roles page', () => {
  it('Should display the title from matrix of roles webpage', async () => {
    var driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build()

    // Open job roles webpage
    driver.get(EngineeringCapabilityUrl)
    // Compare expected title with actual title
    expect(
      await driver.findElement(By.id('matrixOfRolesTitle')).getText()).to.equal(
      'Matrix of Roles')

    // Close browser
    await driver.quit()
  })

  it('Should display a matrix of roles for the Data & AI capability',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(DataCapabilityUrl)

      // Compare expected job role with its band level from the Data & AI capability
      expect(
        await driver.findElement(By.id('table-cell-1')).getText()).to.equal(
        'Principle Data Architect')

      // Close browser
      await driver.quit()
    })

  it('Should display a matrix of roles for the Engineering capability',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(EngineeringCapabilityUrl)

      // Compare expected job role with its band level from the Data & AI capability
      expect(
        await driver.findElement(By.id('table-cell-1')).getText()).to.equal(
        'Principle Architect')

      // Close browser
      await driver.quit()
    })

  it(
    'Redirect to job specification when user click on the job roles display in the Data & AI capability matrix of roles',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(DataCapabilityUrl)

      // Find and click on Principle Data Architect
      expect(await driver.findElement(
        By.linkText('Principle Data Architect')).click())
      // Compare expected title with actual title
      expect(await driver.findElement(
        By.id('jobSpecificationTitle')).getText()).to.equal(
        'Job Specification')

      // Close browser
      await driver.quit()
    })

  it(
    'Redirect to job specification when user click on the job roles display in the Engineering capability matrix of roles',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(EngineeringCapabilityUrl)

      // Find and click on Principle Architect
      expect(
        await driver.findElement(By.linkText('Principle Architect')).click())
      // Compare expected title with actual title
      expect(await driver.findElement(
        By.id('jobSpecificationTitle')).getText()).to.equal(
        'Job Specification')

      // Close browser
      await driver.quit()
    })

  it('Redirect to matrix of roles when user click on the capability text',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(jobRoleUrl)

      // Click on Data & AI capability text from job roles webpage
      expect(await driver.findElement(By.id('capabilityID-1')).click())
      // Compare expected title with actual title
      expect(await driver.findElement(
        By.id('matrixOfRolesTitle')).getText()).to.equal('Matrix of Roles')

      // Close browser
      await driver.quit()
    })

  it('Should be able to go back onto the job role page via back button',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open job spec webpage
      driver.get(DataCapabilityUrl)

      // Find the back button on job roles page and click to go back to homepage
      expect(await driver.findElement(By.linkText('Back')).click())

      // Close browser
      await driver.quit()
    })
})
