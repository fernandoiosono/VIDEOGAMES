require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const server = require('./src/server.js');
const { database } = require('./src/database/database.js')

const { handlerGames, 
	handlerGenres,
	handlerPlatforms } = require('./src/routes');

const { LOCALHOST_PORT, DB_RESET } = process.env;
const dbReset = (DB_RESET === "true")

server.use(cors());
server.use(morgan("dev"));

server.use('/videogames/games', handlerGames);
server.use('/videogames/genres', handlerGenres);
server.use('/videogames/platforms', handlerPlatforms);

database.sync({ force: dbReset })
	.then(() => {
		server.listen(LOCALHOST_PORT, () => {
			console.log(`Server raised in port: ${LOCALHOST_PORT}`);
		});
	})
	.catch((error) => console.log(error));