module.exports = (req, res, next) => {
    const verifyInput = (input) => {
        let inputRegex =/^(?!\s*$).+/
        let isRegexTrue = inputRegex.test(input)
        isRegexTrue ? next() : res.status(400).json({ message: 'Veuillez entrer du contenu' });
    }
    
    verifyInput(req.body.lastName);

  


  };
