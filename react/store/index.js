import {createStore} from 'redux';
import Reducers from '../reducers/Reducers';

let Store = createStore(Reducers);

export default Store;