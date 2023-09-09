import axios from "axios";
import * as actionType from "./actionTypes.js";

const { 
    VITE_ROUTE_POST_GAME,
    VITE_ROUTE_GET_GAMES,
    VITE_ROUTE_GET_GENRES,
    VITE_ROUTE_GET_PLATFORMS 
} = import.meta.env;

export const setAllGames = () => {
    return function (dispatch) {
        axios.get(VITE_ROUTE_GET_GAMES)
            .then((data) => {
                dispatch({
                    type: actionType.SET_ALL_GAMES,
                    payload: data.data
                });
            })
            .catch((error) => { 
                alert(error.response.data.error); 
            });
    };
};

export const addNewGame = (game) => {
    return async () => {
        try {
            await axios.post(VITE_ROUTE_POST_GAME, game);

            alert('New Game Created Successfully');
        } catch(error) {
            alert(error.response.data.error);

            throw error;
        }
    };
};

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

// export const getGamesByName = (name) => {
//     return function (dispatch) {
//         axios.get(`${VITE_ROUTE_GET_GAMES_BY_NAME}=${name}`)
//             .then((data) => {
//                 dispatch({
//                     type: actionType.GET_GAMES_BY_NAME,
//                     payload: data.data
//                 });
//             })
//             .catch((error) => {
//                 alert(error.response.data.error);
//             });
//     };
// };