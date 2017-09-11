/**
 * Category component action types.
 */
export const ActionTypes = {

    CATEGORY: {
        LOAD_CATEGORIES_LIST: 'CATEGORY.LOAD_CATEGORIES_LIST:',
        SHOW_ADD_EDIT_MODAL_DIALOG: 'CATEGORY.SHOW_ADD_EDIT_MODAL_DIALOG',
        HIDE_ADD_EDIT_MODAL_DIALOG: 'CATEGORY.HIDE_ADD_EDIT_MODAL_DIALOG',
        INPUT_NAME_CHANGE: 'CATEGORY.INPUT_NAME_CHANGE',
        ENABLE_MODAL_OK_BUTTON: 'CATEGORY.ENABLE_MODAL_OK_BUTTON',
        DISABLE_MODAL_OK_BUTTON: 'CATEGORY.DISABLE_MODAL_OK_BUTTON',
        SHOW_DELETE_MODAL_DIALOG: 'CATEGORY.SHOW_DELETE_MODAL_DIALOG',
        HIDE_DELETE_MODAL_DIALOG: 'CATEGORY.HIDE_DELETE_MODAL_DIALOG'
    }
};

export function loadCategories(dispatch) {
    const localStorageItems = require('../libs/constants').localStorageItems;
    var categoryItems = localStorage.getItem(localStorageItems.categoriesName);
    var categoriesList = [];

    if ( categoryItems != null ) {
        categoriesList = JSON.parse(categoryItems);

        dispatch({type: ActionTypes.CATEGORY.LOAD_CATEGORIES_LIST, categoriesList: categoriesList});
    } else {
        dispatch({type: ActionTypes.CATEGORY.LOAD_CATEGORIES_LIST, categoriesList: []});
    }
}