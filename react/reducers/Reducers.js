import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import locationReducer from './locationReducer';


export default combineReducers({
    categories: categoryReducer,
    locations: locationReducer
});