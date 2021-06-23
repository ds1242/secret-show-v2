const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// const showRoutes = require('./show');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
// router.use('/show', showRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;