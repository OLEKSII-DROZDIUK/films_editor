import { combineReducers } from 'redux';
import { filmsReducer } from './films';

export const rootReducer = combineReducers({
    films:filmsReducer
});
