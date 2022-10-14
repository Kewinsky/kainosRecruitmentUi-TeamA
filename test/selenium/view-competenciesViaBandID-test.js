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
var bandInfoNoCompetenciesUrl = baseUrl.concat('/view-band-info/1')
var bandInfoCompetenciesUrl = baseUrl.concat('/view-band-info/4')

/* globals describe, it */
describe('UI Testing for Competencies via bandID', () => {
  it('Should display the title from Band Information webpage', async () => {
    var driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build()

    // Open specify webpage
    driver.get(bandInfoNoCompetenciesUrl)
    // Compare expected role name with actual role name for the first entry
    expect(await driver.findElement(
      By.id('bandInformationTitle')).getText()).to.equal(
      'Principal Band Information')

    // Close browser
    await driver.quit()
  })

  it(
    'Should display a table with no data for competencies table with bandID 1 but contain training course',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(bandInfoNoCompetenciesUrl)

      // Compare expected training course name with actual training course name for bandID 1
      expect(await driver.findElement(
        By.id('Training-2022-11-17')).getText()).to.equal(
        'Having Courageous Conversations')

      // Close browser
      await driver.quit()
    })

  it(
    'Should display a table with data for competencies table with bandID 4 and contain training course',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(bandInfoCompetenciesUrl)

      // Compare expected competencies name with actual competencies name for bandID 4
      expect(await driver.findElement(
        By.id('Competencies-Working within teams')).getText()).to.equal(
        'Working within teams')
      // Compare expected training course name with actual training course name for bandID 4
      expect(await driver.findElement(
        By.id('Training-2022-10-04')).getText()).to.equal(
        'Conducting Effective Meetings')

      // Close browser
      await driver.quit()
    })

  it('Should be able to go back onto the Job Roles webpage via back button',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(bandInfoNoCompetenciesUrl)

      // Find the back button on principal band information and click to go back to job roles webpage
      expect(await driver.findElement(By.linkText('Back')).click())
      // Compare expected title with actual title on the job roles webpage
      expect(
        await driver.findElement(By.id('jobRolesTitle')).getText()).to.equal(
        'Job Roles Report')

      // Close browser
      await driver.quit()
    })

  it(
    'Should be able to go back to Band Information webpage from Job roles webpage',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(jobRoleUrl)

      // Click on the first band level from job roles webpage
      expect(await driver.findElement(By.id('bandID-1')).click())
      // Compare expected title with actual title on the band information webpage
      expect(await driver.findElement(
        By.id('bandInformationTitle')).getText()).to.equal(
        'Associate Band Information')

      // Close browser
      await driver.quit()
    })
})
