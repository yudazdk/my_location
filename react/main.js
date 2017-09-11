import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, IndexRoute, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import store from './store';

/*=*/
import App from './components/App';
import Home from './components/Home';
import Category from './components/category/Category';
import Location from './components/location/Location';
import Map from './components/Map';
import Test from './components/Test';
import NotFound from './components/NotFound';

let app = document.getElementById('app');

ReactDOM.render (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>

                <Route path="categories" component={Category}/>
                <Route path="locations" component={Location}/>
            </Route>

            <Route path="test" component={Test}/>

            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>, app
);