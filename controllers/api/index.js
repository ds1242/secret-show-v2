const router = require('express').Router();

const userRoutes = require('./user-routes');
const showRoutes = require('./show-routes')

router.use('/users', userRoutes);
router.use('/show', showRoutes);



module.exports = router;