const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const helpers = require('../lib/helpers');

const passport = require('passport');
const express = require('express');

const loginView = (req, res) => {
  res.render('login');
};

const login = (req, res, next) => {
  passport.authenticate('login', {
    successRedirect: '/inicio',
    failureRedirect: '/login'
  })(req, res, next);
};

const registerView = (req, res) => {
  res.render('register');
};

const register = (req, res, next) => {
  passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register'
  })(req, res, next);
};
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/inicio');
  });
};

const profileView = async (req, res) => {
  let isCurrentUser = false;
  const id = req.params.id;
  const posts = await postModel.getAllByUserId(id);
  let user;
  if (req.user.id == id) {
    isCurrentUser = true;
    user = req.user;
  } else {
    user = await userModel.getById(id);
    if (!user) {
      res.redirect('/inicio');
    }
  }
  res.render('profile', { user, posts, isCurrentUser });
};

const profileEditView = async (req, res) => {
  res.render('profileEdit');
};

const profileEdit = async (req, res) => {
  const id = req.params.id;
  const storedUser = await userModel.getById(id);
  let updatedUser = storedUser;
  if (req.body.bio) {
    updatedUser.bio = req.body.bio;
    userModel.updateById(id, updatedUser);
    res.redirect('/usuario/' + id);
  } else if (
    await helpers.matchPassword(req.body.repitedPassword, storedUser.password)
  ) {
    if (req.body.username) {
      updatedUser.username = req.body.username;
    } else if (req.body.nickname) {
      updatedUser.nickname = req.body.nickname;
    } else if (req.body.password) {
      updatedUser.password = await helpers.encryptPassword(req.body.password);
    }
    userModel.updateById(id, updatedUser);
    res.redirect('/usuario/' + id);
  } else {
    res.redirect('/usuario/' + id + '/editar');
  }
};

const profileDeleteView = (req, res) => {
  res.render('profileDelete');
};

const profileDelete = (req, res) => {
  const id = req.params.id;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    userModel.deleteById(id);
    res.redirect('/inicio');
  });
};

module.exports = {
  loginView,
  login,
  registerView,
  register,
  logout,
  profileView,
  profileEditView,
  profileEdit,
  profileDeleteView,
  profileDelete
};
