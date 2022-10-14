var chai = require('chai')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const By = webdriver.By
let service = new chrome.ServiceBuilder()
.loggingTo('/my/log/file.txt')
.enableVerboseLogging()
.build()

const { assert } = require('chai')
const expect = chai.expect
var baseUrl = 'http://localhost:3000'

/* globals describe, it */
describe('UI Testing for the index page', () => {
  it('Should allow the user to click on Job Roles webpage', async () => {
    var driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build()

    // Home page
    driver.get(baseUrl)

    // Click on job roles page from homepage
    await driver.findElement(By.linkText('Job Roles')).click()
    expect(await driver.findElement(By.id('jobRolesTitle')).getText()).to.equal(
      'Job Roles Report')

    // Close browser
    await driver.quit()
  })

  it('Should allow the user to click on gender bias on job description webpage',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Home page
      driver.get(baseUrl)

      // Click on gender bias on job description page from homepage
      await driver.findElement(
        By.linkText('Predict gender bias in a job description')).click()
      expect(
        await driver.findElement(By.id('genderBiasTitle')).getText()).to.equal(
        'Predict job description gender bias')

      // Close browser
      await driver.quit()
    })
})
