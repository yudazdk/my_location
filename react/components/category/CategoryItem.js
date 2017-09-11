import React from 'react';
import { connect } from 'react-redux';

import * as CategoryActions from '../../actions/CategoryActions';


/**
 * This component handles each row
 * in categories table.
 */
class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * This function dispalys the dit Modal Dialog
     * for editing a category.
     */
    showEditModalDialog() {
        var categoryModalHeader = "";
        var categoryData = {};
        var categoriesList = this.props.categoriesList;

        categoryData = {
            name: this.props.item.name
        };

        categoryModalHeader = "Editing catgory " + categoriesList[this.props.categoryIndex].name + " at index: " +
                              this.props.categoryIndex;

        // Thsi dispatch shows the Modal dialog for adding a category
        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.SHOW_ADD_EDIT_MODAL_DIALOG,
                             categoryModalHeader: categoryModalHeader, categoryIndex: this.props.categoryIndex,
                             categoryData: categoryData});
    }

    /**
     * This function dispalys the dit Modal Dialog
     * for deleting a category.
     */
    showDeleteModalDialog() {
        var modalHeader = "";
        var categoriesList = this.props.categoriesList;

        modalHeader = "Deleting category " + categoriesList[this.props.categoryIndex].name + " at index: "  +
                      this.props.categoryIndex;

        this.props.dispatch({type: CategoryActions.ActionTypes.CATEGORY.SHOW_DELETE_MODAL_DIALOG,
                             categoryIndex: this.props.categoryIndex, modalHeader: modalHeader});
    }

    render() {
        return (
            <tr key={this.props.key}>
                <td>{this.props.item.id}</td>
                <td>{this.props.item.name}</td>
                <td>
                    <button type="button" className="btn btn-success btn-xs"
                            title="Edit Category"
                            onClick={this.showEditModalDialog.bind(this)}>
                        <i className="fa fa-pencil-square-o"/>
                    </button>
                    {'\u00A0'}
                    <button type="button" className="btn btn-danger btn-xs"
                            title="Delete Category"
                            onClick={this.showDeleteModalDialog.bind(this)}>
                        <i className="fa fa-trash-o"/>
                    </button>
                </td>
            </tr>
        );
    }
}


export default connect()(CategoryItem);