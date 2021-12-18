const schemaPassword = require('../models/Password');


module.exports = (req, res, next) => {
    if (!schemaPassword.validate(req.body.password)) {
        res.status(400).json({ error: 'Mot de passe trop faible. Veuillez saisir au moins 8 caractères dont 2 chiffres et au moins une majuscule et une minuscule' });
    }
    else {
        next();
    }
}
