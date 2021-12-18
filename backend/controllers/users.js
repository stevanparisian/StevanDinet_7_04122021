const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const fs = require('fs');
//const Op = db.Sequelize.Op;
const User = db.user;
const Comment = db.comment;
const Post = db.post;
const con = require('../db.confing')


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin,
        picture: req.body.picture
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !',

          isLoggedIn: true,
          id: user.id,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          isAdmin: req.body.isAdmin,
          picture: req.body.body
        }))
        .catch(error => res.status(500).json({ error: "Email déjà utilisé" }));

    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur introuvable!' });

      }
      console.log(user)
      bcrypt.compare(req.body.password, user.password)

        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });

          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              process.env.token,
              { expiresIn: '24h' }
            ),
            isLoggedIn: true,
            id: user.id,
            email: req.body.email,
            isAdmin: req.body.isAdmin

          });


        })
        .catch(err => (res.status(500).json({ message: err.message })))
    })
    .catch(err => (res.status(500).json({ message: err.message })))
};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de retrouver l'User ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la tentative de récupération de l'User" + id
      });
    });

};


exports.updateOneUser = (req, res, next) => {

  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,

    },
    { where: { id: req.params.id } }
  )
    .then(() =>
      res
        .status(201)
        .json({ message: "Utilisateur modifié" })
    )
    .catch((error) => res.status(500).json({ error }));
}
  ;


exports.updatePicture = (req, res, next) => {

  const userObject = req.file ?

    {
      ...req.body.user,
      picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }));
};




exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {


      Post.destroy({ where: { user_id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Posts supprimés !' }))
        .catch(error => res.status(400).json({ error }));

      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'User supprimé !' }))
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
};

