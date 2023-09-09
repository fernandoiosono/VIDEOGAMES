import * as actionType from "./actionTypes.js";

const initialState = {
	navFather: "",
	allGames: [],
	allGenres: [],
	allPlatforms: [],
	gameDetail: {}
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.SET_GAME_DETAIL:
			return { ...state,
				gameDetail: action.payload };

		case actionType.CLEAN_DETAIL:
			return { ...state,
				gameDetail: {} };

		case actionType.SET_ALL_GAMES:
			return { ...state,
				allGames: action.payload };

		case actionType.SET_NAV_FATHER:
			return { ...state,
				navFather: action.payload };

		case actionType.SET_ALL_GENRES:
			return { ...state,
				allGenres: action.payload };

		case actionType.SET_ALL_PLATFORMS:
			return { ...state,
				allPlatforms: action.payload };

		default:
			return { ...state };
	};
};

export default rootReducer;