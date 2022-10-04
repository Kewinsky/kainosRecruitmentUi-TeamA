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

describe('UI Testing for the index page', () => {
   it('Should allow the user to click on Job Roles', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Home page
       driver.get(baseUrl);
       // Close browser
       await driver.quit();
   })
})

