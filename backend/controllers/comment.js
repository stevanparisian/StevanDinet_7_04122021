const db = require('../models/index');

const Comment = db.comment;
exports.createComment = (req, res, next) => {

  const content = req.body.content;
  const id = req.body.id;
  const user = req.body.user;
  const user_id = req.body.user_id;
  const post_id = req.body.post_id
  const comment = new Comment({
    content: content,
    id: id,
    post_id: post_id,
    user_id: user_id,

  });



  comment
    .save()
    .then(() => res.status(201).json({ message: "comment enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {


  Comment.findAll({
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



exports.getOneComment = (req, res, next) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le post avec l'id ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur en essayant de récupérer le post" + id
      });
    });

};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
    .catch(error => res.status(400).json({ error: 'Problème lors de la suppression du commentaire' }));
};


exports.modifyComment = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(data => {
      if (data) {
        res.send({
          message: "Commentaire modifié avec succès"
        });
      } else {
        res.send({
          message: `Impossible de modifier le commentaire ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la tentative de modification du post" + id
      });
    });
};

