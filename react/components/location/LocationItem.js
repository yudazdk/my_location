import React from 'react';
import { connect } from 'react-redux';

import * as LocationActions from '../../actions/LocationActions';


/**
 * This component handles each location item
 * in the locations table list.
 *
 */
class LocationItem extends React.Component {
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

        this.googleMapMode = require('../../libs/constants').googleMapMode;
    }

    /**
     * This class edits the location item.
     *
     */
    editLocation() {
        let locationsList = this.props.locationsList;

        locationsList[this.props.editLocationIndex].name = this.props.locationData.name;
        locationsList[this.props.editLocationIndex].address = this.props.locationData.address;
        locationsList[this.props.editLocationIndex].coordinates = this.props.locationData.coordinates;
        locationsList[this.props.editLocationIndex].categories = this.props.locationData.categories;

        // Store the updated locations
        localStorage.setItem(this.localStorageItems.locationsName, JSON.stringify(locationsList));

        // Load the updated loacations
        LocationActions.loadLocations(this.props.dispatch, this.props.sortDirection, this.props.sortField);

        // Back to view mode
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.DISABLE_LOCATION_ROW_EDITING});
    }

    /**
     * This function show the embeded google map
     * If it's a "view" mode show the map according
     * to the current coordinates value.
     * If it's "edit" mode show the map according
     * to the edited coordinates value.
     *
     * @param mode
     */
    showGoogleMap(mode) {
        switch ( mode ) {
            case this.googleMapMode.edit:
                this.props.dispatch({type:LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_MAP,
                                     googleMapsCoordinates: this.props.locationData.coordinates});
                break;

            case this.googleMapMode.view:
                this.props.dispatch({type:LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_MAP,
                                     googleMapsCoordinates: this.props.item.coordinates});
                break;
        }
    }

    /**
     * This function disables editing
     * the item and changed it's mode
     * to "view" mode.
     */
    disableEditing() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.DISABLE_LOCATION_ROW_EDITING});
    }

    /**
     * This function enables editing
     * the item and changes it's mode
     * to "edit" mode.
     *
     */
    enableEditing() {
        var locationData = {};

        // A variable to store changes
        // untul the item is saved.
        locationData = {
            name: this.props.item.name,
            address: this.props.item.address,
            coordinates: this.props.item.coordinates,
            categories: this.props.item.categories
        };

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.ENABLE_LOCATION_ROW_EDITING,
                             locationIndex: this.props.locationIndex, locationData: locationData});
    }

    /**
     * This function shows the delete modal
     * dialog.
     */
    showDeleteModalDialog() {
        var modalHeader = "";
        var locationsList = this.props.locationsList;

        modalHeader = "Deleting location " + locationsList[this.props.locationIndex].name + " at index: "  +
                      this.props.locationIndex;

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SHOW_DELETE_MODAL_DIALOG,
                             locationIndex: this.props.locationIndex, modalHeader: modalHeader});
    }

    /**
     * This function displays buttons for each item.
     * The buttons are not displayed when another
     * item is being edited or a new item is added.
     *
     * @returns {*}
     */
    renderNonEditedRowButtons() {
        if (!this.props.showAddLocationRow && this.props.editLocationIndex == -1) {
            return (
                <div className="pull-right">
                    <button type="button" className="btn btn-success btn-xs"
                            title="Edit location"
                            onClick={this.enableEditing.bind(this)}>
                        <i className="fa fa-pencil-square-o"/>
                    </button>
                    {'\u00A0'}
                    <button type="button" className="btn btn-danger btn-xs"
                            title="Delete location"
                            onClick={this.showDeleteModalDialog.bind(this)}>
                        <i className="fa fa-trash-o"/>
                    </button>
                </div>
            );
        } else {
            return '\u00A0';
        }
    }

    /**
     * This function displays the current
     * categories for each item.
     *
     * @returns {*}
     */
    renderNonEditedCategories() {
        var that = this;

        if ( this.props.item.categories.length > 0 ) {
            let locationCategories = this.props.item.categories.map( function(item, categoryId) {
                if ( that.props.item.categories[categoryId] == 1 && that.props.categoriesList[categoryId].deleted == 0 ) {
                    return (
                        <li key={categoryId}>{that.props.categoriesList[categoryId].name}</li>
                    );
                }
            });

            return (
                <ul>
                    {locationCategories}
                </ul>
            );
        } else {
            return '\u00A0';
        }
    }

    /**
     * This function displays the item
     * in "view" mode.
     *
     * @returns {XML}
     */
    renderNonEditedRow() {
        return (
            <tr key={this.props.key}>
                <td>{this.props.item.name}</td>
                <td>{this.renderNonEditedCategories()}</td>
                <td>{this.props.item.address}</td>
                <td>
                    {this.props.item.coordinates}
                    {'\u00A0'}
                    <span className="pull-right">
                        <button type="button" className="btn btn-success btn-xs" title="Goole Map"
                                onClick={this.showGoogleMap.bind(this, this.googleMapMode.view)}>
                            <i className="fa fa-map-marker"/>
                        </button>
                    </span>
                </td>
                <td>{this.renderNonEditedRowButtons()}</td>
            </tr>
        );
    }

    /**
     * This function show a modal that displays
     * the map with the item's current coordinates.
     *
     * @returns {XML}
     */
    renderGoogleMapIcon() {
        if ( this.props.locationData.coordinates.length > 0 ) {
            return (
                <span className="pull-right">
                    <button type="button" className="btn btn-success btn-xs"
                            title="Goole Map"
                            onClick={this.showGoogleMap.bind(this, this.googleMapMode.edit)}>
                        <i className="fa fa-map-marker"/>
                    </button>
                    {'\u00A0'}
                    <button type="button" className="btn btn-success btn-xs" title="Goole Map"
                            onClick={this.showGoogleMapApiModal.bind(this)}>
                            <i className="fa fa-pencil-square-o"/>
                    </button>
                </span>
            );
        } else {
            return (
                <span className="pull-right">
                    <button type="button" className="btn btn-success btn-xs" title="Goole Map"
                            onClick={this.showGoogleMapApiModal.bind(this)}>
                            <i className="fa fa-pencil-square-o"/>
                    </button>
                </span>
            );
        }
    }

    /**
     * This function shows a modal
     * for editing the item's categories.
     */
    showEditCategoriesModal() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SHOW_LOCATION_EDIT_CATEGORY_MODAL,
                             actionType: 'edit'});
    }

    /**
     * This function renders the item's updated
     * categories in "edit" mode.
     *
     * @returns {*}
     */
    renderNewCategoriesField() {
        var that = this;

        if ( this.props.showLocationEditCategoriesModal ) {
            return '\u00A0';
        }

        if ( this.props.locationData.categories.length > 0 ) {
            let locationCategories = that.props.locationData.categories.map( function(item, categoryId) {
                if ( that.props.locationData.categories[categoryId] == 1 && that.props.categoriesList[categoryId].deleted == 0) {
                    return (
                        <li key={categoryId}>{that.props.categoriesList[categoryId].name}</li>
                    );
                }
            });

            return (
                <div className="row">
                    <div className="col-md-6">
                        <ul>
                            {locationCategories}
                        </ul>
                    </div>

                    <div className="col-md-6 pull-right">
                        <button type="button" className="btn btn-success btn-xs" title="Edit Categories"
                                onClick={this.showEditCategoriesModal.bind(this)}>
                            <i className="fa fa-pencil-square-o"/>
                        </button>
                    </div>
                </div>
            )
        } else {
            let spanStyle = {
                color: '#cc0000',
                fontWeight: 'bold'
            };

            return (
                <div>
                    <span style={spanStyle}>Please choose category</span>
                    {'\u00A0'}
                    <button type="button" className="btn btn-success btn-xs" title="Add Categories"
                            onClick={this.showEditCategoriesModal.bind(this)}>
                        <i className="fa fa-plus"/>
                    </button>
                </div>
            );
        }
    }

    /**
     * This function show the google api modal
     * for selecting coordinates for the current
     * item.
     *
     */
    showGoogleMapApiModal() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_API_MAPS});
    }

    /**
     * This function updates the coordinates
     * according to the address.
     *
     */
    getCoordinatesByAddress() {
        if ( this.props.locationData.address.length > 0 ) {
            LocationActions.getCoordinatesByAddress(this.props.dispatch, this.props.locationData.address);
        }
    }

    addressChange(e) {
        var address = e.target.value;

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.INPUT_DATA_CHANGE,
            fieldName: "address", fieldValue: address});
    }

    nameChange(e) {
        var locationName = e.target.value;

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.INPUT_DATA_CHANGE,
            fieldName: "name", fieldValue: locationName});
    }

    validateAddress(address) {
        var addressName = address.trim();

        if ( 0 == addressName.length ) {
            return false;
        } else {
            return true;
        }
    }

    validateName(name) {
        var locationName = name.trim();

        if ( 0 == locationName.length ) {
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

        this.addressInputStyle = {
            borderColor: this.borderColor.valid
        };

        this.coordinatesInputStyle = {
            borderColor: this.borderColor.valid
        }
    }

    validateVariables() {
        this.validInputs = true;

        if ( this.validateName(this.props.locationData.name) ) {
            this.nameInputStyle.borderColor = this.borderColor.valid;
        } else {
            this.validInputs = false;
            this.nameInputStyle.borderColor = this.borderColor.inValid;
        }

        if ( this.validateAddress(this.props.locationData.address) ) {
            this.addressInputStyle.borderColor = this.borderColor.valid;
        } else {
            this.validInputs = false;
            this.addressInputStyle.borderColor = this.borderColor.inValid;
        }
    }

    /**
     * This function renders the current item
     * in "edit" mode.
     *
     * @returns {XML}
     */
    renderEditedRow() {
        this.initVariables();

        this.validateVariables();

        return (
            <tr key={this.props.key}>
                <td>
                    <input type="text" className="form-control form-control-sm"
                           style={this.nameInputStyle}
                           value={this.props.locationData.name}
                           onChange={this.nameChange.bind(this)} />
                </td>
                <td>
                    {this.renderNewCategoriesField()}
                </td>
                <td>
                    <input type="text" className="form-control form-control-sm"
                           style={this.addressInputStyle}
                           value={this.props.locationData.address}
                           onChange={this.addressChange.bind(this)}/>
                    {'\u00A0'}
                    <button className="btn btn-success btn-xs" title="Update Coordinates by address"
                            onClick={this.getCoordinatesByAddress.bind(this)}>
                        <i className="fa fa-compass"/>
                    </button>

                </td>
                <td>
                    {this.props.locationData.coordinates}
                    {this.renderGoogleMapIcon()}
                </td>
                <td>
                    <button className="btn btn-success btn-xs" title="Save Location"
                            onClick={this.editLocation.bind(this)} disabled={!this.validInputs}>
                        <i className="fa fa-floppy-o"/>
                    </button>
                    {'\u00A0'}
                    <button className="btn btn-danger btn-xs" title="Cancel"
                            onClick={this.disableEditing.bind(this)}>
                        <i className="fa fa-times"/>
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        if ( this.props.locationIndex == this.props.editLocationIndex ) {
            // If the edit index equals the location index then
            // the current location item is being edited
            return this.renderEditedRow();
        } else {
            return this.renderNonEditedRow();
        }
    }
}


export default connect()(LocationItem);