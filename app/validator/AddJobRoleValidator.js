
module.exports.validateUserInput = function (role) {
    if(Object.values(role).some(x => x === null || x === '')){
        throw new Error("Each field must be filled in")
    }
    if (role.roleName.length > 50) {
        throw new Error("Role name is too long")
    }
    if (role.roleName.length < 2) {
            throw new Error("Role name is too short")
        }
    if(!this.validateRoleName(role.roleName)){
        throw new Error("Role name can only consist of letters")
    }
    if (role.specification.length > 500) {
        throw new Error("Role specification is too long")
    }
    if (role.specification.length < 5) {
            throw new Error("Role specification is too short")
        }
    if (role.responsibility.length > 200) {
        throw new Error("Responsibility is too long")
    }
    if (role.responsibility.length < 5) {
            throw new Error("Responsibility is too short")
        }
    if (role.link.length > 500) {
            throw new Error("URL too long")
    }
    if (role.link.length < 5) {
            throw new Error("URL too short")
    }
    return true
}

module.exports.validateRoleName = function (roleName) {
    var reg = /^[A-Za-z\s]*$/;
    return roleName.match(reg)
}



