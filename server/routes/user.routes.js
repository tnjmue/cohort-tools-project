const router = require('express').Router();
const User = require('../models/User.model');

router.get('/:userId', (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
    .then (user => { res.status(200).json(user) })
    .catch(err => {
        console.error("Internal server error while trying to display user profile", err)
        next(err);
    });
})

module.exports = router