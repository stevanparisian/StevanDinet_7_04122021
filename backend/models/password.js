const passwordValidator = require('password-validator');

const schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)
.is().max(60)
.has().uppercase()
.has().lowercase()
.has().digits(2);


module.exports = schemaPassword;