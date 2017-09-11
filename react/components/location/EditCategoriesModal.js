import React from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';

import ModalWindow from '../global/ModalWindow';

import * as LocationActions from '../../actions/LocationActions';


class EditCategoriesModal extends React.Component {

    saveLocationCategory() {
        var newLocationCategories = [];

        for ( let categoryId = 0; categoryId < this.props.locationData.categories.length; categoryId++) {
            if (this.props.locationData.categories[categoryId] == 1) {
                newLocationCategories[categoryId] = 1;
            }
        }

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.INPUT_DATA_CHANGE, fieldName: "categories",
                             fieldValue: newLocationCategories});

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_LOCATION_EDIT_CATEGORY_MODAL});
    }

    hideModalDialog() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.RESTORE_LOCATION_CATEGORIES});

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_LOCATION_EDIT_CATEGORY_MODAL});
    }

    validateCategories(currentCCategoryId) {
        for (let categoryId = 0; categoryId < this.props.locationData.categories.length; categoryId++) {
            if ( currentCCategoryId != categoryId && this.props.locationData.categories[categoryId] == 1 ) {
                return true;
            }
        }

        return false;
    }

    checkBoxChange(categoryId) {
        if ( this.props.locationData.categories[categoryId] == 1 ) {
            this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.CATEGORY_INPUT_CHANGE, categoryId: categoryId,
                                 checkBoxValue: 0});

            if ( this.validateCategories(categoryId) ) {
                this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.ENABLE_CATEGORY_MODAL_OK_BUTTON});
            } else {
                this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.DISABLE_CATEGORY_MODAL_OK_BUTTON});
            }
        } else {
            this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.CATEGORY_INPUT_CHANGE, categoryId: categoryId,
                                 checkBoxValue: 1});

            this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.ENABLE_CATEGORY_MODAL_OK_BUTTON});
        }
    }

    renderCategories() {
        var that = this;

        let categoriesList = this.props.categoriesList.map( function(categoryItem, index) {
            if ( categoryItem.deleted == 0 ) {
                return (
                    <li key={index}>
                        <input type="checkbox"
                               value={that.props.locationData.categories[categoryItem.id] == undefined ? 0 : that.props.locationData[categoryItem.id]}
                               checked={that.props.locationData.categories[categoryItem.id] == 1}
                               onChange={that.checkBoxChange.bind(that, categoryItem.id)}
                        />
                        {'\u00A0'}
                        {categoryItem.name}
                    </li>
                );
            }
        });

        return (
            <ul>
                {categoriesList}
            </ul>
        );
    }

    render() {

        return (
            <ModalWindow show={this.props.showLocationEditCategoriesModal}
                         buttonOk={this.saveLocationCategory.bind(this)}
                         buttonCancel={this.hideModalDialog.bind(this)}
                         buttonX={this.hideModalDialog.bind(this)}
                         title="Edit Location Category" disabledOkStatus={this.props.modalCategoryDisabledOkStatus}
                         style={{zIndex: '9001'}}>
                {this.renderCategories()}
            </ModalWindow>
        );
    }
}


function mapStateToProps(state) {
    return {
        categoriesList: state.categories.categoriesList,
        locationData: state.locations.locationData,
        showLocationEditCategoriesModal: state.locations.showLocationEditCategoriesModal,
        modalCategoryDisabledOkStatus: state.locations.modalCategoryDisabledOkStatus
    }
}

export default connect(mapStateToProps)(withRouter(EditCategoriesModal));