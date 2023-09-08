const router = require('express').Router();
const errorHandler = require('../middlewares');

const { getGameByID,
    getGames,
    getGamesByName,
    postGame } = require('../controllers');

router.get('/all', errorHandler(async (req, res) => {
    const games = await getGames();

    res.status(200).json(games);
}));

router.get('/name', errorHandler(async (req, res) => {
    const { name } = req.query;
    const games = await getGamesByName(name);

    res.status(200).json(games);
}));

router.get('/:id', errorHandler(async (req, res) => {
    const { id } = req.params;
    const game = await getGameByID(id);

    res.status(200).json(game);
}));

router.post('/', errorHandler(async (req, res) => {
    const newGame = req.body;

    const gameCreated = await postGame(newGame);

    res.status(200).json(gameCreated);
}));

module.exports = router;