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

/* globals describe, it */
describe(
  'UI Testing for Job Roles Webpage with added functionality (responsibility)',
  () => {
    it('Should have an additional column for the responsibility data',
      async () => {
        var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build()

        // Open job roles webpage
        driver.get(jobRoleUrl)
        // Compare expected title with actual title
        expect(await driver.findElement(
          By.id('responsibilityID-2')).getText()).to.equal(
          'You’ll manage other in the capability to help them navigate their careers.')

        // Close browser
        await driver.quit()
      })
  })
