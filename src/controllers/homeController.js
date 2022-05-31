const postModel = require('../models/postModel');

const redirectToHome = (req, res) => {
  res.redirect('/inicio');
};

const homeView = async (req, res) => {
  const posts = await postModel.getAll();
  res.render('index', { posts });
};

module.exports = {
  redirectToHome,
  homeView
};
