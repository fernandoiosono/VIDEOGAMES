const router = require('express').Router();
const errorHandler = require('../middlewares');
const { getPlatforms } = require('../controllers');

router.get('/all', errorHandler(async (req, res) => {
    const platforms = await getPlatforms();

    res.status(200).json(platforms);
}));

module.exports = router;