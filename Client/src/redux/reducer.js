import * as actionType from "./actionTypes.js";
import * as viewCaption from "../views/viewCaptions.js";

const initialState = {
	// Initial Catalogs
	allGames: [],
	allGenres: [],
	allPlatforms: [],

	currentView: { // To Show the Home Caption
		caption: "",
		payload: ""
	},

	lastPage : 0, // Selected at Home View
	homeGames: [], // (Initial Catalog || Search)
	gameDetail: {},
	filteredHomeResults: [], // After (Filtering || Ordering)

	homeResultsOptions: { // Filtering & Ordering Options
		filter: {
			genre: "",
			platform: "",
			origin: ""
		},
		order: {
			type: "",
			direction: ""
		}
	}
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.CLEAN_SEARCH:
			return { ...state,
				homeGames: state.allGames,
				currentView: { caption: viewCaption.HOME, payload: "" } };

		case actionType.SET_GAMES_BY_NAME:
			return { ...state,
				homeGames: action.payload };

		case actionType.SET_LAST_PAGE:
			return { ...state,
				lastPage: action.payload };

		case actionType.SET_GAME_DETAIL:
			return { ...state,
				gameDetail: action.payload };

		case actionType.CLEAN_DETAIL:
			return { ...state,
				gameDetail: {} };

		case actionType.SET_ALL_GAMES:
			return { ...state,
				allGames: action.payload,
				homeGames: action.payload,
				filteredHomeResults: action.payload };

		case actionType.SET_CURRENT_VIEW:
			return { ...state,
				currentView: action.payload };

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