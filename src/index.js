const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const app = express();
require('./lib/passport');

// Vistas
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views')) + '/layouts',
    partialsDir: path.join(app.get('views')) + '/partials',
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  })
);
app.set('view engine', '.hbs');

// Middlewares
const pool = require('./database');
app.use(
  session({
    store: new (require('connect-pg-simple')(session))({
      pool: pool
    }),
    secret: 'pgnodesession',
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: false
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

// Rutas
const homeRouter = require('./routes/homeRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
app.use(homeRouter);
app.use(userRouter);
app.use(postRouter);
// añadir mensajes en el futuro

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
const port = process.env.APPport || 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
