import axios from "axios";
import * as actionType from "./actionTypes.js";

const { VITE_ROUTE_GET_GENRES,
    VITE_ROUTE_GET_PLATFORMS } = import.meta.env;

export const getAllGames = () => { // PENDING
    return { type: actionType.GET_ALL_GAMES }
}

export const setNavFather = (father) => { // OK
    return {
        type: actionType.SET_NAV_FATHER,
        payload: father
    };
};

export const setAllGenres = () => { // OK
    return function (dispatch) {
        axios.get(VITE_ROUTE_GET_GENRES)
            .then((data) => {
                dispatch({
                    type: actionType.SET_ALL_GENRES,
                    payload: data.data
                });
            })
            .catch((error) => { 
                alert(error.response.data.error); 
            });
    };
};

export const setAllPlatforms = () => { // OK
    return function (dispatch) {
        axios.get(VITE_ROUTE_GET_PLATFORMS)
            .then((data) => {
                dispatch({
                    type: actionType.SET_ALL_PLATFORMS,
                    payload: data.data
                });
            })
            .catch((error) => { 
                alert(error.response.data.error); 
            });
    };
};

export const setGameDetail = () => { // PENDING
    return { type: actionType.SET_GAME_DETAIL };
};

export const cleanState = () => { // PENDING
	return { type: actionType.CLEAN_STATE };
};

export const cleanDetail = () => { // PENDING
    return { type: actionType.CLEAN_DETAIL }
};

// export const setCharacterDetail = (id) => {
//     return function (dispatch) {
//         fetch(urlInfoChar + id)
//             .then((response) => response.json())
//             .then((data) => 
//                 dispatch({
//                     type: actionType.SET_CHARACTER_DETAIL,
//                     payload: {
//                         id: id,
//                         name: data.name,
//                         status: formatUnknown(data.status),
//                         species: formatUnknown(data.species),
//                         type: formatUnknown(data.type),
//                         gender: formatUnknown(data.gender),
//                         origin: formatUnknown(data.origin.name),
//                         location: formatUnknown(data.location.name),
//                         image: data.image,
//                         created: formatUnknown(data.created)
//                     }
//                 })
//             );
//     };
// };

// export const delCharacter = (id) => {
//     return {
//         type: actionType.DEL_CHARACTER,
//         payload: id
//     };
// };

// export const addFavorite = (id, name, image, gender) => {
// 	const endPoint = "http://localhost:3001/rickandmorty/fav";
// 	const character = { 
// 		id: id, 
// 		name: name, 
// 		image: image, 
// 		gender: gender 
// 	}

// 	return (dispatch) => {
// 		axios.post(endPoint, character)
// 			.then(({ data }) => {
// 				return dispatch({
// 					type: actionType.ADD_FAVORITE,
// 					payload: data
// 				});
// 			})
// 	}
// 	// return {
// 	// 	type: actionType.ADD_FAVORITE,
// 	// 	payload: { 
// 	// 		id: id, 
// 	// 		name: name, 
// 	// 		image: image, 
// 	// 		gender: gender 
// 	// 	}
// 	// };
// };

// export const delFavorite = (id) => {
// 	return {
// 		type: actionType.DEL_FAVORITE,
// 		payload: id
// 	};
// };

// export const filterFavorites = (gender) => {
// 	return {
// 		type: actionType.FILTER_FAVORITES,
// 		payload: gender
// 	};
// };

// export const orderFavorites = (order) => {
// 	return {
// 		type: actionType.ORDER_FAVORITES,
// 		payload: order
// 	};
// };