import * as CategoryActions from '../actions/CategoryActions';

const initialState = {
   categoriesList: [],

    showAddEditCategoryModalDialog: false,

    addEditCategoryModalHeader: '',

    editCategoryIndex: -1,

    categoryData: {
        name: ''
    },

    modalDisabledOkStatus: false,

    deleteCategoryIndex: -1,

    showDeleteModalDialog: false,

    deleteModalHeader: ''
};

function categoryReducer(state = initialState, action) {
    switch (action.type) {

        case CategoryActions.ActionTypes.CATEGORY.LOAD_CATEGORIES_LIST:
            var newState = {...state};
            newState.categoriesList = [...newState.categoriesList];

            newState.categoriesList = action.categoriesList;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.SHOW_ADD_EDIT_MODAL_DIALOG:
            var newState = {...state};
            newState.categoryData = {...newState.categoryData};

            newState.showAddEditCategoryModalDialog = true;

            newState.addEditCategoryModalHeader = action.categoryModalHeader;

            newState.editCategoryIndex = action.categoryIndex;

            newState.categoryData = {
                name: action.categoryData.name
            };

            if ( -1 == action.categoryIndex ) {
                newState.modalDisabledOkStatus = true;
            }

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.HIDE_ADD_EDIT_MODAL_DIALOG:
            var newState = {...state};
            newState.categoryData = {...newState.categoryData};

            newState.showAddEditCategoryModalDialog = false;

            newState.addEditCategoryModalHeader = '';

            newState.editCategoryIndex = action.editCategoryIndex;

            newState.categoryData = {
                name: ''
            };

            newState.modalDisabledOkStatus = false;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.INPUT_NAME_CHANGE:
            var newState = {...state};
            newState.categoryData = {...newState.categoryData};

            newState.categoryData.name = action.categoryName;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.ENABLE_MODAL_OK_BUTTON:
            var newState = {...state};

            newState.modalDisabledOkStatus = false;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.DISABLE_MODAL_OK_BUTTON:
            var newState = {...state};

            newState.modalDisabledOkStatus = true;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.SHOW_DELETE_MODAL_DIALOG:
            var newState = {...state};

            newState.showDeleteModalDialog = true;

            newState.deleteCategoryIndex = action.categoryIndex;

            newState.deleteModalHeader = action.modalHeader;

            return newState;
            break;

        case CategoryActions.ActionTypes.CATEGORY.HIDE_DELETE_MODAL_DIALOG:
            var newState = {...state};

            newState.showDeleteModalDialog = false;

            newState.deleteCategoryIndex = -1;

            newState.deleteModalHeader = '';

            return newState;
            break;

        default:
            return state;
            break;
    }
}

export default categoryReducer;