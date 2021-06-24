const router = require('express').Router();
const { User, Comment, Band, Show} = require('../../models');

// Find all shows
router.get('/', (req, res) => {
    Show.findAll(
        {
        include: {
            model: User,
            attributes: ['id']
        }
    })
        .then(dbShowData => res.json(dbShowData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot find show' })
        });
});

router.get('/', (req, res) => {
    Show.findOne(
        {
        include: {
            model: User,
            attributes: ['id']
        }
    })
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
        show_date: req.body.show_date,
        privacy: req.body.privacy,
        user_id: req.session.user_id
    })

    .then(dbShowData => res.json(dbShowData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
