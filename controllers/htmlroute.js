const router = require('express').Router();

router.get('/shows', (req, res) => {
    console.log("rendering handlebar with show details and comments");
    res.render('shows');
})

module.exports = router;