import * as actionType from "./actionTypes.js";

const initialState = {
	navFather: "",
	allGenres: [],
	allPlatforms: [],
	allGames: [],
	gamesByName: [],
	gameDetail: {}
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.GET_GAMES_BY_NAME:
			return { ...state,
				gamesByName: action.payload };

		case actionType.SET_NAV_FATHER:
			return { ...state,
				navFather: action.payload };

		case actionType.SET_ALL_GENRES:
			return { ...state,
				allGenres: action.payload };

		case actionType.SET_ALL_PLATFORMS:
			return { ...state,
				allPlatforms: action.payload };

		// case actionType.ADD_CHARACTER:
		// 	return { ...state,
		// 		allCharacters: [...state.allCharacters, action.payload] };

		// case actionType.DEL_CHARACTER:
		// 	return { ...state,
		// 		allCharacters: [...state.allCharacters].filter((char) => char.id !== action.payload),
		// 		allFavorites: [...state.allFavorites].filter((char) => char.id !== action.payload),
		// 		// The next line is not necessary but I include it to keep the congruece of the global state
		// 		favorites: [...state.favorites].filter((char) => char.id !== action.payload) } 

		// case actionType.SET_CHARACTER_DETAIL:
		// 	return { ...state,
		// 		characterDetail: action.payload };

		// case actionType.ADD_FAVORITE:
		// 	return { ...state, 
		// 		favorites: action.payload,
		// 		allFavorites: action.payload };
		// 	// return { ...state, 
		// 	// 	allFavorites: [...state.allFavorites, action.payload],
		// 	// 	favorites: [...state.allFavorites, action.payload] };

		// case actionType.DEL_FAVORITE:
		// 	return { ...state, 
		// 		allFavorites: [...state.allFavorites].filter((char) => char.id !== action.payload),
		// 		favorites: [...state.favorites].filter((char) => char.id !== action.payload) };

		// case actionType.FILTER_FAVORITES:
		// 	return { ...state,
		// 		favorites: (action.payload) ? [...state.allFavorites].filter((char) => char.gender === action.payload)
		// 			: [...state.allFavorites] };

		// case actionType.ORDER_FAVORITES:
		// 	return { ...state,
		// 		favorites: (action.payload === "Ascending") ? [...state.favorites].sort((a, b) => a.id - b.id) 
		// 			: ((action.payload === "Descending") ? [...state.favorites].sort((a, b) => a.id - b.id).reverse()
		// 				: [...state.favorites]) };

		// case actionType.CLEAN_FILTER_FAVORITES:
		// 	return { ...state,
		// 		favorites: [...state.allFavorites] };

		// case actionType.CLEAN_DETAIL:
		// 	return { ...state,
		// 		characterDetail: {} };

		// case actionType.CLEAN_STATE:
		// 	return { ...state,
		// 		userIsAuth: false,
		// 		allCharacters: [],
		// 		characterDetail: {},
		// 		allFavorites: [],
		// 		favorites: [] };
				
		default:
			return { ...state };
	};
};

export default rootReducer;