import {GET_FILMS,LOAD_NEW_FILMS, DELETE_FILM, ADD_FILM,SORT_BY_NAME} from '../actions/action';

export const initialState = {
    films:[
      
    ]
};


export function filmsReducer(state = initialState, action ) {
   
    switch (action.type) {
        case GET_FILMS:
            return  {...state, films:[...action.payload]}
        case LOAD_NEW_FILMS:
            return {...state, films:[...action.payload]}
        case DELETE_FILM:
            return {...state, films:[...action.payload]}
        case ADD_FILM:
            return {...state, films:[...action.payload]}
        case SORT_BY_NAME:
            return {...state, films:[...state.films.sort((a,b) =>  (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : ((b.title > a.title) ? 1 : 0) )]}
        default:
            return state
    }
}