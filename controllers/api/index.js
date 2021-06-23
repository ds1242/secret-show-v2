const router = require('express').Router();

const userRoutes = require('./user-routes');
const roleRoutes = require('./role-routes');
const showRoutes = require('./shows-routes');

router.use('/users', userRoutes);
router.use('/role', roleRoutes);
router.use('/shows', showRoutes);

module.exports = router;