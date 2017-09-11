import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import ModalWindow from '../global/ModalWindow';
import AddEditCategoryModal from './AddEditCategoryModal';

import CategoryItem from './CategoryItem';

import * as CategoryActions from '../../actions/CategoryActions';


/**
 * This component handles the categories
 * actions.
 */
class Category extends React.Component {
    constructor(props) {
        super(props);

        this.initConstants();
    }

    initConstants() {
        this.localStorageItems = require('../../libs/constants').localStorageItems;
    }

    deleteCategory() {
        var categoriesList = this.props.categoriesList;

        // updating object property "deleted to 1 means
        // that the category is deleted
        categoriesList[this.props.deleteCategoryIndex].deleted = 1;

        localStorage.setItem(this.localStorageItems.categoriesName, JSON.stringify(categoriesList));

        // Loading the categories
        CategoryActions.loadCategories(this.props.dispatch);

        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.HIDE_DELETE_MODAL_DIALOG});
    }

    /**
     * This function cancels the delete action.
     */
    hideDeleteModalDialog() {
        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.HIDE_DELETE_MODAL_DIALOG});
    }

    /**
     * This function shows the Modal for
     * adding a category.
     */
    showAddCategoryModalDialog() {
        var categoryModalHeader = "Adding category to categories list";
        var categoryData = {};

        categoryData = {
            name: ''
        };

        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.SHOW_ADD_EDIT_MODAL_DIALOG,
                             categoryModalHeader: categoryModalHeader, categoryIndex: -1, categoryData: categoryData});
    }

    componentWillMount() {
        CategoryActions.loadCategories(this.props.dispatch);
    }

    /**
     * This function renders each row in categories
     * array to a component.
     *
     * @returns {XML}
     */
    renderCategoriesList() {
        var that = this;

        this.categoriesRows = this.props.categoriesList.map( function(categoryItem, index) {
            // Show only a category which is not deleted.
            if ( 0 == categoryItem.deleted ) {
                return (
                    <CategoryItem key={index} categoryIndex={index} item={categoryItem}
                                  categoriesList={that.props.categoriesList}/>
                );
            }
        });

        return (
            <tbody>
                {this.categoriesRows}
            </tbody>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 panelTitle">Category Page</div>

                <div className="col-md-6">
                    <button className="btn btn-primary mainBtn pull-left"
                            onClick={this.showAddCategoryModalDialog.bind(this)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
                        Add Category
                    </button>
                </div>

                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>{'\u00A0'}</th>
                        </tr>
                        </thead>

                        {this.renderCategoriesList()}
                    </table>
                </div>

                <AddEditCategoryModal/>

                <ModalWindow show={this.props.showDeleteModalDialog}
                             buttonOk={this.deleteCategory.bind(this)}
                             buttonCancel={this.hideDeleteModalDialog.bind(this)}
                             buttonX={this.hideDeleteModalDialog.bind(this)}
                             title={this.props.deleteModalHeader} style={{zIndex: '9001'}}>
                    <div>Are you sure ?</div>
                </ModalWindow>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        categoriesList: state.categories.categoriesList,
        showDeleteModalDialog: state.categories.showDeleteModalDialog,
        deleteModalHeader: state.categories.deleteModalHeader,
        deleteCategoryIndex: state.categories.deleteCategoryIndex
    }
}

export default connect(mapStateToProps)(withRouter(Category));