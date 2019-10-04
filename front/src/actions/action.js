import axios from 'axios';
const URL = "http://localhost:4000"

export const GET_FILMS = 'GET_FILMS';
export const LOAD_NEW_FILMS = 'LOAD_NEW_FILMS';
export const DELETE_FILM = 'DELETE_FILM';
export const WAIT_FILMS_REQUEST = 'WAIT_FILMS_REQUEST';
export const LOAD_FILMS_FAIL = 'LOAD_FILMS_FAIL';
export const ADD_FILM = 'ADD_FILM';
export const SORT_BY_NAME = 'SORT_BY_NAME';

export function sortByName(){

    return dispatch => {
        dispatch({
            type: SORT_BY_NAME,
        });
    }
}

export function getAllFilms(){

    return dispatch => {
        dispatch({
            type: WAIT_FILMS_REQUEST,
        });

        axios.get(URL+"/films/get").then(response => {
            dispatch({
                type: GET_FILMS,
                payload: response.data.films
            });
    
        })
        .catch((err) => {
            dispatch({
                type: LOAD_FILMS_FAIL,
                payload: []
            });
        })
    }
}

export function loadNewFilms(films){

    return dispatch => {
        dispatch({
            type: WAIT_FILMS_REQUEST,
        });

        axios.post(URL+"/films/load", {
        films
        }).then(response => {
            dispatch({
                type: LOAD_NEW_FILMS,
                payload: response.data.films
            });
    
        })
        .catch((err) => {
            dispatch({
                type: LOAD_FILMS_FAIL,
                payload: []
            });
        })
    }
}

export function deleteFilm(filmId){
    return dispatch => {
        dispatch({
            type: WAIT_FILMS_REQUEST,
        });

        axios.delete(URL+"/films/delete", {
            data: { _id: filmId }
        }).then(response => {
            dispatch({
                type: DELETE_FILM,
                payload: response.data.films
            });
    
        })
        .catch((err) => {
            dispatch({
                type: LOAD_FILMS_FAIL,
                payload: []
            });
        })
    }
}

export function addFilm(film){
    return dispatch => {
        dispatch({
            type: WAIT_FILMS_REQUEST,
        });

        axios.post(URL+"/films/add", {
            film
        }).then(response => {
            dispatch({
                type: ADD_FILM,
                payload: response.data.films
            });
        })
        .catch((err) => {
            dispatch({
                type: LOAD_FILMS_FAIL,
                payload: []
            });
        })
    }

}

