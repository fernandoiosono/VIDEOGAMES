import axios from "axios";
import * as actionType from "./actionTypes.js";

const { 
    VITE_ROUTE_GAMES,
    VITE_ROUTE_GET_GENRES,
    VITE_ROUTE_GET_PLATFORMS
} = import.meta.env;

export const setGameDetail = (id) => {
    return function (dispatch) {
        axios.get(`${VITE_ROUTE_GAMES}/${id}`)
            .then((data) => {
                dispatch({
                    type: actionType.SET_GAME_DETAIL,
                    payload: data.data
                });
            })
            .catch((error) => {
                const handledError = error.response.data.error;
                alert((handledError === "(RAWG): undefined") 
                    ? handledError.replace('undefined', "The Game with the ID Entered Doesn't Exist")
                    : handledError);
            });
    };
};

export const setAllGames = () => {
    return function (dispatch) {
        axios.get(`${VITE_ROUTE_GAMES}/all`)
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
            await axios.post(VITE_ROUTE_GAMES, game);

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

export const cleanDetail = () => {
    return { type: actionType.CLEAN_DETAIL };
};