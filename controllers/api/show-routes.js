const router = require('express').Router();
const { User, Comment, Band, Show, Genre } = require('../../models');

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

// Create show "/api/show"
router.post('/', (req, res) => {
    Show.create({
        bandname: req.body.bandname,
        genre: req.body.genre,
        img: req.body.img,
        youtube_id: req.body.youtube_id,
        show_location: req.body.show_location,
        show_time: req.body.show_time,
        privacy: req.body.privacy,
        user_id: req.session.user_id
    })

        .then(dbShowData => res.json(dbShowData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//displaying all comments for the show "/api/show/comments/:showID"
router.get('/comment/:showID', (req, res) => {

    console.log("displaying comments for a particular show/band");

    Comment.findAll({
        where: { show_id: req.params.showID }
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot find comments for the show' })
        });
});

//creating a new comment for the show "/api/show/comments"
router.post('/comment', (req, res) => {
    console.log("creating a comment for a show", req.body);
    //user_id: session.username
    Comment.create({ ...req.body, user_id: req.session.user_id })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot add comments for the show' })
        });

})

module.exports = router;
