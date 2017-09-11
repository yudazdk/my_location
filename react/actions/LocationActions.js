import Axios from 'axios';

import {arraySort} from '../libs/globalFunctions';

/**
 * Location component action types.
 */
export const ActionTypes = {

    LOCATION: {
        LOAD_LOCATIONS_LIST: 'LOCATION.LOAD_LOCATIONS_LIST:',
        INPUT_DATA_CHANGE: 'LOCATION.INPUT_DATA_CHANGE',
        CATEGORY_INPUT_CHANGE: 'LOCATION.CATEGORY_INPUT_CHANGE',
        SHOW_DELETE_MODAL_DIALOG: 'LOCATION.SHOW_DELETE_MODAL_DIALOG',
        HIDE_DELETE_MODAL_DIALOG: 'LOCATION.HIDE_DELETE_MODAL_DIALOG',
        SHOW_GOOGLE_MAP: 'LOCATION.SHOW_GOOGLE_MAP',
        HIDE_GOOGLE_MAP: 'LOCATION.HIDE_GOOGLE_MAP',
        SHOW_ADD_LOCATION_ROW: 'LOCATION.SHOW_ADD_LOCATION_ROW',
        HIDE_ADD_LOCATION_ROW: 'LOCATION.HIDE_ADD_LOCATION_ROW',
        SHOW_LOCATION_EDIT_CATEGORY_MODAL: 'LOCATION.SHOW_LOCATION_EDIT_CATEGORY_MODAL',
        HIDE_LOCATION_EDIT_CATEGORY_MODAL: 'LOCATION.HIDE_LOCATION_EDIT_CATEGORY_MODAL',
        RESTORE_LOCATION_CATEGORIES: 'LOCATION.RESTORE_LOCATION_CATEGORIES',
        ENABLE_CATEGORY_MODAL_OK_BUTTON: 'LOCATION.ENABLE_CATEGORY_MODAL_OK_BUTTON',
        DISABLE_CATEGORY_MODAL_OK_BUTTON: 'LOCATION.DISABLE_CATEGORY_MODAL_OK_BUTTON',
        ENABLE_LOCATION_ROW_EDITING: 'LOCATION.ENABLE_LOCATION_ROW_EDITING',
        DISABLE_LOCATION_ROW_EDITING: 'LOCATION.DISABLE_LOCATION_ROW_EDITING',
        UPDATE_SORT_DATA: 'LOCATION.UPDATE_SORT_DATA',
        UPDATE_GOOGLE_API_COORDINATES: 'LOCATION.UPDATE_GOOGLE_API_COORDINATES',
        SHOW_GOOGLE_API_MAPS: 'LOCATION.SHOW_GOOGLE_API_MAPS',
        HIDE_GOOGLE_API_MAPS: 'LOCATION.HIDE_GOOGLE_API_MAPS',
        SAVE_GOOGLE_MAPS_API_COORDINATES: 'LOCATION.SAVE_GOOGLE_MAPS_API_COORDINATES',
        UPDATE_SEARCH_DATA: 'LOCATION.UPDATE_SEARCH_DATA'
    }
};

export function getCoordinatesByAddress(dispatch, address) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +
             "&key=AIzaSyAh5GRsCOCNauaJNWORjuman0P3jDzPL0E";

    Axios.get(url).then( function(response) {
        let coordinates = response.data.results[0].geometry.location.lat + ',' +
                          response.data.results[0].geometry.location.lng;

        dispatch({type: ActionTypes.LOCATION.INPUT_DATA_CHANGE, fieldName: 'coordinates', fieldValue: coordinates});
    }).catch( function(error) {
        console.log(error);
    });
}

export function loadLocations(dispatch, sortDirection, sortField) {
    const localStorageItems = require('../libs/constants').localStorageItems;
    var locationItems = localStorage.getItem(localStorageItems.locationsName);
    var locationsList = [];

    if ( locationItems != null ) {
        locationsList = JSON.parse(locationItems);

        locationsList.sort(arraySort(sortDirection, sortField));

        dispatch({type: ActionTypes.LOCATION.LOAD_LOCATIONS_LIST, locationsList: locationsList});
    } else {
        dispatch({type: ActionTypes.LOCATION.LOAD_LOCATIONS_LIST, locationsList: []});
    }
}