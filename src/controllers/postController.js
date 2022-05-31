const postModel = require('../models/postModel');

const postView = async (req, res) => {
  const { id } = req.params;
  let isCurrentUser = false;
  try {
    const post = await postModel.getById(id);
    const comments = await postModel.getAllByParentId(id);
    if (req.user.id == post.user_id) {
      isCurrentUser = true;
    }
    res.render('post', { post, comments, isCurrentUser });
  } catch (error) {
    console.log(error);
  }
};

const postCreate = (req, res) => {
  const user_id = req.user.id;
  const { text } = req.body;
  try {
    postModel.create({ text, user_id });
    res.redirect('/inicio');
  } catch (error) {
    console.log(error);
  }
};

const postCreateChild = async (req, res) => {
  const { parent_id } = req.params;
  const user_id = req.user.id;
  const { text } = req.body;
  try {
    postModel.createChild(parent_id, { text, user_id });
    res.redirect('/post/' + parent_id);
  } catch (error) {
    console.log(error);
  }
};

const postEditView = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.getById(id);
    res.render('postEdit', { post });
  } catch (error) {
    console.log(error);
  }
};

const postEdit = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await postModel.updateById(id, { text });
    res.redirect('/post/' + id);
  } catch (error) {
    console.log(error);
  }
};

const postDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await postModel.deleteById(id);
    res.redirect('/inicio');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postCreate,
  postView,
  postCreateChild,
  postEditView,
  postEdit,
  postDelete
};
