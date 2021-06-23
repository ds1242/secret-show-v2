const router = require('express').Router();
const session = require('express-session');
const { User, Role, Comment, Band, Show, Genre } = require('../../models');


router.get('/', (req, res) => {

    console.log("displaying show for a particular show/band");

    Show.findAll({
        // where: { show_id: req.params.showID }
    })
        .then(dbShowData => {
            let hbsObject;
            if (dbShowData.length > 0) {
                //converting result into an OBject 
                hbsObject = {
                    shows: dbShowData
                };
            } else {
                hbsObject = {
                    shows: [{}]
                };
            }
            console.log("show details for a criteria ", hbsObject);
            res.render("shows", hbsObject);
        })
        .catch(err => {
            res.status(500).json({ message: 'Cannot find comments for the show' })
        });
});

router.get('/show/comments/:showID', (req, res) => {

    console.log("displaying comments for a particular show/band");

    Comment.findAll({
        where: { show_id: req.params.showID }
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot find comments for the show' })
        });
});

router.post('/show/comments', (req, res) => {
    //user_id: session.username
    Comment.create(req.body)
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot add comments for the show' })
        });

})

module.exports = router;