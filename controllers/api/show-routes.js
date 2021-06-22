const router = require('express').Router();
const { User, Comment, Band, Show, Genre } = require('../../models');

// Find all shows
router.get('/', (req, res) => {
    Show.findAll()
        .then(dbShowData => res.json(dbShowData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot find show' })
        });
});

// Create show
router.post('/', (req, res) => {
    Show.create({
        bandname: req.body.bandname,
        genre: req.body.genre,
        img: req.body.img,
        youtube_id: req.body.youtube_id,
        show_location: req.body.show_location,
        show_time: req.body.show_time,
        privacy: req.body.privacy,
        user_id: req.body.user_id
    })
        .then(dbShowData => {
            res.json(dbShowData)
        })
        .catch(err => {
            res.status(500).json({ message: 'unable to create show' });
        });
});

module.exports = router;
