const passport = require('passport');
const LocalStrategy = require('passport-local');

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user);
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { nickname } = req.body;
      const newUser = {
        username,
        password,
        nickname
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query(
        'INSERT INTO users (username, password, nickname) VALUES($1, $2, $3) RETURNING *',
        [newUser.username, newUser.password, newUser.nickname]
      );
      newUser.id = result.rows[0].id;
      return done(null, newUser);
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  done(null, result.rows[0]);
});
