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

router.get('/:id', errorHandler(async (req, res) => {
    const { id } = req.params;
    const game = await getGameByID(id);

    res.status(200).json(game);
}));

// router.get('/name', errorHandler(async (req, res) => {
//     const { name } = req.query;
//     const games = await getGamesByName(name);

//     res.status(200).json(games);
// }));

// router.post('/', errorHandler(async (req, res) => {
//     const { game } = req.body;
//     const newGame = await postGame(game);

//     res.status(200).json(newGame);
// }));

module.exports = router;