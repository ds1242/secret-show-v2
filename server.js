const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sessSecret = uuidv4();
console.log(sessSecret);

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: sessSecret,
    cookie: {
        maxAge: 1 * 30 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,    
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on, http://localhost:${PORT}`));

});
