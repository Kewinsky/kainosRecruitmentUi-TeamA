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
var bandInfoTrainingUrl = baseUrl.concat('/view-band-info/1')

/* globals describe, it */
describe('UI Testing for category associated with training via bandID', () => {
  it(
    'Should display a table with data containing a category column with its respectable data given the bandID',
    async () => {
      var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()

      // Open specify webpage
      driver.get(bandInfoTrainingUrl)

      // Compare expected category name with actual category name for bandID 1
      expect(await driver.findElement(
        By.id('CategoryID-2022-11-17')).getText()).to.equal(
        'Professional skills')

      // Close browser
      await driver.quit()
    })
})
