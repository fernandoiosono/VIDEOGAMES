const router = require('express').Router();
const errorHandler = require('../middlewares');
const { getGenres } = require('../controllers');

router.get('/all', errorHandler(async (req, res) => {
    const genres = await getGenres();

    res.status(200).json(genres);
}));

module.exports = router;