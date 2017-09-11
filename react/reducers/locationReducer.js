import * as LocationActions from '../actions/LocationActions';

const initialState = {
    locationsList: [],

    sortDirection: 'asc',

    sortField: 'name',

    editLocationIndex: -1,

    locationData: {
        name: '',
        address: '',
        coordinates: '',
        categories: []
    },

    deleteLocationIndex: -1,

    showDeleteModalDialog: false,

    deleteModalHeader: '',

    googleMapsCoordinates: '',

    showGoogleMap: false,

    showAddLocationRow: false,

    showLocationEditCategoriesModal: false,

    modalCategoryDisabledOkStatus: false,

    prevLocationCategories: [],

    showGoogleMapApi: false,

    googleApiMap: {
        lat: -7000,
        lng: -7000
    },

    searchCategoryId: null,

    searchCategoryName: ''
};

function locationReducer(state = initialState, action) {
    switch (action.type) {

        case LocationActions.ActionTypes.LOCATION.LOAD_LOCATIONS_LIST:
            var newState = {...state};
            newState.locationsList = [...newState.locationsList];

            newState.locationsList = action.locationsList;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SHOW_ADD_LOCATION_ROW:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.showAddLocationRow = true;

            newState.locationData = {
                name: '',
                address: '',
                coordinates: '',
                categories: []
            };

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.HIDE_ADD_LOCATION_ROW:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.showAddLocationRow = false;

            newState.locationData = {
                name: '',
                address: '',
                coordinates: '',
                categories: []
            };

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.INPUT_DATA_CHANGE:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.locationData[action.fieldName] = action.fieldValue;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SHOW_DELETE_MODAL_DIALOG:
            var newState = {...state};

            newState.showDeleteModalDialog = true;

            newState.deleteLocationIndex = action.locationIndex;

            newState.deleteModalHeader = action.modalHeader;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.HIDE_DELETE_MODAL_DIALOG:
            var newState = {...state};

            newState.showDeleteModalDialog = false;

            newState.deleteLocationIndex = -1;

            newState.deleteModalHeader = '';

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_MAP:
            var newState = {...state};

            newState.showGoogleMap = true;

            newState.googleMapsCoordinates = action.googleMapsCoordinates;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.HIDE_GOOGLE_MAP:
            var newState = {...state};

            newState.showGoogleMap = false;

            newState.googleMapsCoordinates = '';

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SHOW_LOCATION_EDIT_CATEGORY_MODAL:
            var newState = {...state};
            newState.prevLocationCategories = [...newState.prevLocationCategories];

            newState.showLocationEditCategoriesModal = true;

            if ( action.actionType == "add" ) {
                newState.modalCategoryDisabledOkStatus = true;
            }

            newState.prevLocationCategories = newState.locationData.categories;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.HIDE_LOCATION_EDIT_CATEGORY_MODAL:
            var newState = {...state};
            newState.prevLocationCategories = [...newState.prevLocationCategories];

            newState.showLocationEditCategoriesModal = false;

            newState.modalCategoryDisabledOkStatus = false;

            newState.prevLocationCategories = [];

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.RESTORE_LOCATION_CATEGORIES:
            var newState = {...state};
            newState.locationData = {...newState.locationData};
            newState.locationData.categories = [...newState.locationData.categories];

            newState.locationData.categories = newState.prevLocationCategories;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.ENABLE_CATEGORY_MODAL_OK_BUTTON:
            var newState = {...state};

            newState.modalCategoryDisabledOkStatus = false;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.DISABLE_CATEGORY_MODAL_OK_BUTTON:
            var newState = {...state};

            newState.modalCategoryDisabledOkStatus = true;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.CATEGORY_INPUT_CHANGE:
            var newState = {...state};
            newState.locationData = {...newState.locationData};
            newState.locationData.categories = [...newState.locationData.categories];

            newState.locationData.categories[action.categoryId] = action.checkBoxValue;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.ENABLE_LOCATION_ROW_EDITING:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.editLocationIndex = action.locationIndex;

            newState.locationData = {
                name: action.locationData.name,
                address: action.locationData.address,
                coordinates: action.locationData.coordinates,
                categories: action.locationData.categories
            };

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.DISABLE_LOCATION_ROW_EDITING:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.editLocationIndex = -1;

            newState.locationData = {
                name: '',
                address: '',
                coordinates: '',
                categories: []
            };

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.UPDATE_SORT_DATA:
            var newState = {...state};

            newState.sortDirection = action.sortDirection;
            newState.sortField = action.sortField;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.UPDATE_GOOGLE_API_COORDINATES:
            var newState = {...state};
            newState.googleApiMap = {...newState.googleApiMap};

            newState.googleApiMap.lat = action.lat;
            newState.googleApiMap.lng = action.lng;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_API_MAPS:
            var newState = {...state};
            newState.googleApiMap = {...newState.googleApiMap};

            let arrOfCoordinates = [];

            if (newState.locationData.coordinates.length > 0) {
                arrOfCoordinates = newState.locationData.coordinates.split(',');

                newState.googleApiMap.lat = Number(arrOfCoordinates[0]);
                newState.googleApiMap.lng = Number(arrOfCoordinates[1]);
            }

            newState.showGoogleMapApi = true;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.HIDE_GOOGLE_API_MAPS:
            var newState = {...state};
            newState.googleApiMap = {...newState.googleApiMap};

            newState.showGoogleMapApi = false;
            newState.googleApiMap = {
                lat: -7000,
                lng: -7000
            };

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.SAVE_GOOGLE_MAPS_API_COORDINATES:
            var newState = {...state};
            newState.locationData = {...newState.locationData};

            newState.locationData.coordinates = newState.googleApiMap.lat + ',' + newState.googleApiMap.lng;

            return newState;
            break;

        case LocationActions.ActionTypes.LOCATION.UPDATE_SEARCH_DATA:
            var newState = {...state};

            newState.searchCategoryName = action.categoryName;
            newState.searchCategoryId = action.categoryId;

            return newState;
            break;

        default:
            return state;
            break;
    }
}

export default locationReducer;