const db = require('../models/index');
const fs = require('fs')



const Post = db.post;
exports.createPost = (req, res, next) => {

  if (!req.body.title) {
    return res.status(400).send({
      message: "Veuillez ajouter un titre"
    })
  };



  const title = req.body.title;
  const id = req.body.id;
  const user = req.body.user;
  const user_id = req.body.user_id;
  image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
  const post = new Post({
    title: title,
    id: id,
    image: image,
    user_id: user_id,

  });


  post
    .save()
    .then(() => res.status(201).json({ message: "post enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};


exports.getAllPosts = (req, res, next) => {


  Post.findAll({
    order: [['createdAt', 'DESC']],

    include:

    {
      model: db.user,
      attributes: ["firstName", "lastName", "picture"],

    },


  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};



exports.getOnePost = (req, res, next) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de retrouver le post ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du post" + id
      });
    });

};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {

      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
};


exports.modifyPost = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(data => {
      if (data) {
        res.send({
          message: "Post modifié avec succès"
        });
      } else {
        res.send({
          message: `Impossible de modifier le post ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la tentative de modification du post" + id
      });
    });
};

exports.updatePicture = (req, res, next) => {

  const postObject = req.file ?

    {
      ...req.body.post,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post modifié' }))
    .catch(error => res.status(400).json({ error }));
};

