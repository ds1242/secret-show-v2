const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'super secret string',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on, http://localhost:${PORT}`));
});
