var chai = require('chai');
const expect = chai.expect;
const AddJobRoleValidator = require('../../../app/validator/AddJobRoleValidator.js');

describe('AddJobRoleValidator', function() {
    describe('validateUserInput', function () {

        it('should return error when role name is longer than 50 chars', () => {
            let role = {
                roleName: "Software EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware Engineer",
                specification: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                link: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                capabilityID: 1,
                bandID: 1
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name is too long")
        })

        it('should return error when role specification is longer than 500 chars', () => {
            let role = {
                roleName: "Software Engineer",
                specification: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's livesAs a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's liveAs a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's liveAs a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's liveAs a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's live ",
                link: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                capabilityID: 1,
                bandID: 1
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role specification is too long")
        })

        it('should return error when role name contains numbers', () => {
            let role = {
                roleName: "Software Engine12121212er",
                specification: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                link: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                capabilityID: 1,
                bandID: 1
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name can only consist of letters")
        })

        it('should return error when role name contains special char', () => {
            let role = {
                roleName: "Software Engineer???????",
                specification: "As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people's lives ",
                link: "https://kainossoftwareltd.sharepoint.com/people/Job%20Specifications/Forms/AllItems.aspx?id=%2Fpeople%2FJob%20Specifications%2FEngineering%2FJob%20profile%20%2D%20Software%20Engineer%20%28Trainee%29%2Epdf&parent=%2Fpeople%2FJob%20Specifications%2FEngineering&p=true&ga=1",
                capabilityID: 1,
                bandID: 1
            }
            expect(function(){AddJobRoleValidator.validateUserInput(role)}).to.throw(Error, "Role name can only consist of letters")
        })
    })
})