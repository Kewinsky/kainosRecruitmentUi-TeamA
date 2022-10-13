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
var genderBiasUrl = baseUrl.concat('/predict-gender-bias');

describe('UI Testing for the gender prediction page', () => {
   it('Should allow user to enter in a bias text in the provided text box', async() => {
       var driver = new webdriver.Builder()
           .withCapabilities(webdriver.Capabilities.chrome())
           .build();

       // Gender bias prediction webpage
       driver.get(genderBiasUrl);

       // Go into the text box and enter in a bias snippet of text
       await driver.findElement(By.id('gender-bias-textbox')).sendKeys("He saw her");
       // Click submit to send the following text to the model and receive the results back from the API
       await driver.findElement(By.id('submit')).click();
       // Compare actual bias predicted from expected
       expect(await driver.findElement(By.id('biased%Text')).getText()).to.equal('50.0%');

       // Close browser
       await driver.quit();
   })

  it('Should allow user to enter in a un-bias text in the provided text box', async() => {
      var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

      // Gender bias prediction webpage
      driver.get(genderBiasUrl);

      // Go into the text box and enter in a bias snippet of text
      await driver.findElement(By.id('gender-bias-textbox')).sendKeys("They love shopping in the city centre");
      // Click submit to send the following text to the model and receive the results back from the API
      await driver.findElement(By.id('submit')).click();
      // Compare actual bias predicted from expected
      expect(await driver.findElement(By.id('biased%Text')).getText()).to.equal('0.0%');

      // Close browser
      await driver.quit();
  })

  it('Should show user all the male bias test found in the text box', async() => {
      var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

      // Gender bias prediction webpage
      driver.get(genderBiasUrl);

      // Go into the text box and enter in a bias snippet of text
      await driver.findElement(By.id('gender-bias-textbox')).sendKeys("He saw her in the distance");
      // Click submit to send the following text to the model and receive the results back from the API
      await driver.findElement(By.id('submit')).click();
      // Compare actual bias text found for the listed genders
      expect(await driver.findElement(By.id('maleBiasedText')).getText()).to.equal('he');
      expect(await driver.findElement(By.id('femaleBiasedText')).getText()).to.equal('her');

      // Close browser
      await driver.quit();
  })

  it('Should be able to go back onto the homepage via back button', async() => {
      var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

      // Open job spec webpage
      driver.get(genderBiasUrl);

       // Find the back button on job roles page and click to go back to homepage
       expect(await driver.findElement(By.linkText('Back')).click());

       // Close browser
       await driver.quit();
  })
})

