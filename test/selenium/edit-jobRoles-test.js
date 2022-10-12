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

describe('UI Testing for Job Roles Webpage with added functionality (editing job roles row)', () => {
    it('Should allow a user to edit a job role of their choosing', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open job roles webpage
        driver.get(jobRoleUrl);
        // Click on the edit button to display the edit link for each job roles
        await driver.findElement(By.linkText('Edit')).click();
        // Click on the edit link for Data Analyst
        await driver.findElement(By.id('jobEditRoleID-1')).click();
        // Change the capability that Data Analyst is in from Data & AI to Engineering
        await driver.findElement(By.id('capabilityID-2')).click();
        // Submit changes via clicking Submit Edited Job Role
        await driver.findElement(By.id('submit')).click();
        // Expect the capability that Data Analyst belongs to, to have changed to Engineering
        expect(await driver.findElement(By.id('capabilityID-1')).getText()).to.equal('Engineering');

        // Close browser
        await driver.quit();
    })

    it('Change Data Analyst back to  the original state', async() => {
        var driver = new webdriver.Builder()
                   .withCapabilities(webdriver.Capabilities.chrome())
                   .build();

        // Open job roles webpage
        driver.get(jobRoleUrl);
        // Click on the edit button to display the edit link for each job roles
        await driver.findElement(By.linkText('Edit')).click();
        // Click on the edit link for Data Analyst
        await driver.findElement(By.id('jobEditRoleID-1')).click();
        // Change the capability that Data Analyst is in from Data & AI to Engineering
        await driver.findElement(By.id('capabilityID')).click();
        // Submit changes via clicking Submit Edited Job Role
        await driver.findElement(By.id('submit')).click();
        // Expect the capability that Data Analyst belongs to, to have changed to Engineering
        expect(await driver.findElement(By.id('capabilityID-1')).getText()).to.equal('Data & AI');

        // Close browser
        await driver.quit();
    })
})