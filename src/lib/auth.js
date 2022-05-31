module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  },
  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/inicio');
  },
  isCurrentUser(req, res, next) {
    if (req.params.id == req.user.id) {
      return next();
    }
    return res.redirect('/inicio');
  }
};
