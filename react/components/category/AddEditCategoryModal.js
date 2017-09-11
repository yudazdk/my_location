import React from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';

import ModalWindow from '../global/ModalWindow';

import * as CategoryActions from '../../actions/CategoryActions';


/**
 * This class handles the add/editing of a category
 */
class AddEditCategoryModal extends React.Component {
    constructor(props) {
        super(props);

        this.initConstants();
    }

    initConstants() {
        this.borderColor = {
            valid: '#ccc',
            inValid: '#cc0000'
        };

        this.localStorageItems = require('../../libs/constants').localStorageItems;
    }

    /**
     * This function adds a category
     * to the categories.
     */
    addCatgory() {
        var categoriesList = this.props.categoriesList;

        categoriesList.push({id: this.props.categoriesList.length, name: this.props.categoryData.name, deleted: 0});

        localStorage.setItem(this.localStorageItems.categoriesName, JSON.stringify(categoriesList));

        // Loading the categories.
        CategoryActions.loadCategories(this.props.dispatch);
    }

    /**
     * This function edits a category.
     */
    editCategory() {
        var categoriesList = this.props.categoriesList;

        categoriesList[this.props.editCategoryIndex].name = this.props.categoryData.name;

        localStorage.setItem(this.localStorageItems.categoriesName, JSON.stringify(categoriesList));

        // Loading the categories.
        CategoryActions.loadCategories(this.props.dispatch);
    }

    /**
     * This function saves a category
     * and according to editCategoryIndex
     * it calls addCategory or editcategory
     */
    saveCategory() {
        if ( !this.validInputs ) {
            return;
        }

        if ( -1 == this.props.editCategoryIndex ) {
            // If no category is being edited (editCategoryIndex == -1)
            // then the action is adding a category
            this.addCatgory();
        } else {
            // If a category is being edited (editCategoryIndex 1= -1)
            // then the action is editing a category
            this.editCategory();
        }

        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.HIDE_ADD_EDIT_MODAL_DIALOG});
    }

    /**
     * This function cancels the action that
     * is being taken on a category.
     */
    hideCategoryModalDialog() {
        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.HIDE_ADD_EDIT_MODAL_DIALOG});
    }

    /**
     * This function is triggered by
     * name change event.
     *
     * @param e
     */
    nameChange(e) {
        var categoryName = e.target.value;

        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.INPUT_NAME_CHANGE, categoryName: categoryName});

        if ( !this.validateName(categoryName) ) {
            // If the name is not valid disable the OK button of the Modal
            this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.DISABLE_MODAL_OK_BUTTON});
        } else {
            this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.ENABLE_MODAL_OK_BUTTON});
        }
    }

    /**
     * This function validates the name
     * by checking if it's empty
     *
     * @param name
     * @returns {boolean}
     */
    validateName(name) {
        var categoryName = name.trim();

        if ( 0 == categoryName.length ) {
            return false;
        } else {
            return true;
        }
    }

    initVariables() {
        this.validInputs = true;

        this.nameInputStyle = {
            borderColor: this.borderColor.valid
        };
    }

    /**
     * This function validates the
     * input data.
     */
    validateVariables() {
        this.validInputs = true;

        if ( this.validateName(this.props.categoryData.name) ) {
             this.nameInputStyle.borderColor = this.borderColor.valid;
        } else {
            this.validInputs = false;
            this.nameInputStyle.borderColor = this.borderColor.inValid;
        }
    }

    render() {
        this.initVariables();

        this.validateVariables();

        return (
            <ModalWindow show={this.props.showAddEditCategoryModalDialog}
                         buttonOk={this.saveCategory.bind(this)}
                         buttonCancel={this.hideCategoryModalDialog.bind(this)}
                         buttonX={this.hideCategoryModalDialog.bind(this)}
                         title={this.props.addEditCategoryModalHeader} disabledOkStatus={this.props.modalDisabledOkStatus}
                         style={{zIndex: '9001'}}>
                <div className="modal-body">
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="category_name" className="col-sm-4">Name:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm"
                                       id="category_name" style={this.nameInputStyle}
                                       value={this.props.categoryData.name}
                                       onChange={this.nameChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWindow>
        );
    }
}


function mapStateToProps(state) {
    return {
        showAddEditCategoryModalDialog: state.categories.showAddEditCategoryModalDialog,
        addEditCategoryModalHeader: state.categories.addEditCategoryModalHeader,
        editCategoryIndex: state.categories.editCategoryIndex,
        categoryData: state.categories.categoryData,
        modalDisabledOkStatus: state.categories.modalDisabledOkStatus,
        categoriesList: state.categories.categoriesList
    }
}

export default connect(mapStateToProps)(withRouter(AddEditCategoryModal));