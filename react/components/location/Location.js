import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router';

import ModalWindow from '../global/ModalWindow';
import Combo from '../global/Combo';
import EditCategoriesModal from './EditCategoriesModal';

import LocationItem from './LocationItem';
import Map from '../Map';

import * as CategoryActions from '../../actions/CategoryActions';
import * as LocationActions from '../../actions/LocationActions';


class Location extends React.Component {
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

    componentWillMount() {
        CategoryActions.loadCategories(this.props.dispatch);

        LocationActions.loadLocations(this.props.dispatch, this.props.sortDirection, this.props.sortField);
    }

    showGoogleMap() {
        this.props.dispatch({type:LocationActions.ActionTypes.LOCATION.SHOW_GOOGLE_MAP,
                             googleMapsCoordinates: this.props.locationData.coordinates});
    }

    deleteLocation() {
        let locationsList = this.props.locationsList;

        locationsList[this.props.deleteLocationIndex].deleted = 1;

        localStorage.setItem(this.localStorageItems.locationsName, JSON.stringify(locationsList));

        LocationActions.loadLocations(this.props.dispatch, this.props.sortDirection, this.props.sortField);

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_DELETE_MODAL_DIALOG});
    }

    hideDeleteModalDialog() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_DELETE_MODAL_DIALOG});
    }

    hideGoogleMap() {
        this.props.dispatch({type:LocationActions.ActionTypes.LOCATION.HIDE_GOOGLE_MAP});
    }

    addLocation() {
        let locationsList = this.props.locationsList;

        locationsList.push({id: this.props.locationsList.length, name: this.props.locationData.name,
                            categories: this.props.locationData.categories, address: this.props.locationData.address,
                            coordinates: this.props.locationData.coordinates, deleted: 0});

        localStorage.setItem(this.localStorageItems.locationsName, JSON.stringify(locationsList));

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_ADD_LOCATION_ROW});

        LocationActions.loadLocations(this.props.dispatch, this.props.sortDirection, this.props.sortField);
    }

    hideAddLocationRow() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_ADD_LOCATION_ROW});
    }

    showAddLocationRow() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SHOW_ADD_LOCATION_ROW});
    }

    renderLocationsList() {
        let that = this;

        this.locationsRows = this.props.locationsList.map( function(locationItem, index) {
            let searchCategoryId = that.props.searchCategoryId;
            let locationCategories = locationItem.categories;

            if ( 0 == locationItem.deleted ) {

                if ( searchCategoryId == null ) {
                    return (
                        <LocationItem key={index} locationIndex={index} item={locationItem} locationData={that.props.locationData}
                                      categoriesList={that.props.categoriesList} locationsList={that.props.locationsList}
                                      showAddLocationRow={that.props.showAddLocationRow}
                                      editLocationIndex={that.props.editLocationIndex} sortDirection={that.props.sortDirection}
                                      sortField={that.props.sortField}
                        />
                    );
                } else {
                    if (locationCategories[searchCategoryId] == 1) {
                        return (
                            <LocationItem key={index} locationIndex={index} item={locationItem} locationData={that.props.locationData}
                                          categoriesList={that.props.categoriesList} locationsList={that.props.locationsList}
                                          showAddLocationRow={that.props.showAddLocationRow}
                                          editLocationIndex={that.props.editLocationIndex} sortDirection={that.props.sortDirection}
                                          sortField={that.props.sortField}
                            />
                        );
                    }
                }
            }
        });

        return (
            <tbody>
                {this.locationsRows}
                {this.renderNewLocationRow()}
            </tbody>
        );
    }

    renderGoogleMapIcon() {
        if ( this.props.locationData.coordinates.length > 0 ) {
            return (
                <span className="pull-right">
                    <button type="button" className="btn btn-success btn-xs"
                            title="Goole Map"
                            onClick={this.showGoogleMap.bind(this)}>
                        <i className="fa fa-map-marker"/>
                    </button>
                </span>
            );
        }
    }

    saveGoogleApiModalCoordinates() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SAVE_GOOGLE_MAPS_API_COORDINATES});

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_GOOGLE_API_MAPS});
    }

    hideGoogleMapApiModal() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.HIDE_GOOGLE_API_MAPS});
    }

    showEditCategoriesModal() {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.SHOW_LOCATION_EDIT_CATEGORY_MODAL,
                             actionType: 'add'});
    }

    renderNewCategoriesField() {
        var that = this;

        if ( this.props.showLocationEditCategoriesModal ) {
            return '\u00A0';
        }

        if ( this.props.locationData.categories.length > 0 ) {
            let locationCategories = that.props.locationData.categories.map( function(item, categoryId) {
                if ( that.props.locationData.categories[categoryId] == 1 ) {
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

    renderNewLocationRow() {
        if ( this.props.showAddLocationRow ) {
            return (
                <tr>
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
                               onChange={this.addressChange.bind(this)}
                               onBlur={this.getCoordinatesByAddress.bind(this)}/>
                    </td>
                    <td>
                        {this.props.locationData.coordinates}
                        {this.renderGoogleMapIcon()}
                    </td>
                    <td>
                        <button className="btn btn-success btn-xs" title="Save Location"
                                onClick={this.addLocation.bind(this)}
                                disabled={!this.validInputs}>
                            <i className="fa fa-floppy-o"/>
                        </button>
                        {'\u00A0'}
                        <button className="btn btn-danger btn-xs" title="Cancel"
                                onClick={this.hideAddLocationRow.bind(this)}>
                            <i className="fa fa-times"/>
                        </button>
                    </td>
                </tr>
            );
        }
    }

    getCoordinatesByAddress() {
        LocationActions.getCoordinatesByAddress(this.props.dispatch, this.props.locationData.address);
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

    sortLocations(sortDirection, sortField) {
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.UPDATE_SORT_DATA, sortDirection: sortDirection,
                             sortField: sortField});

        LocationActions.loadLocations(this.props.dispatch, sortDirection, sortField);
    }

    renderSortIcon() {
        if ( this.props.sortDirection == 'asc' ) {
            return (
                <button type="button" className="btn btn-primary btn-xs"
                        title="Sort Desc" onClick={this.sortLocations.bind(this, 'desc', 'name')}>
                    <i className="fa fa-sort-alpha-desc"/>
                </button>
            );
        } else {
            return (
                <button type="button" className="btn btn-primary btn-xs"
                        title="Sort Asc" onClick={this.sortLocations.bind(this, 'asc', 'name')}>
                    <i className="fa fa-sort-alpha-asc"/>
                </button>
            );
        }
    }

    /**
     * This function opens a modal for updating
     * coordinates via Google mpa service
     *
     * @returns {XML}
     */
    renderGoogleApiMap() {
        const containerElement = <div style={{ height: 400, width: 700 }} />;
        const mapElement = <div style={{ height: 400, width: 700 }} />;

        // Don't load the google map service before
        // google api coordiantes have been updated.
        if ( this.props.googleApiMap.lat != -7000 ) {
            return (
                <Map containerElement={containerElement} mapElement={mapElement}
                     googleApiMap={this.props.googleApiMap} zoom={8} dispatch={this.props.dispatch}/>
            );
        }
    }

    getSearchId(categoryName) {
        let categoriesList = this.props.categoriesList;
        let categoryIndex = -1;
        let categoryId = null;

        categoryIndex = categoriesList.findIndex(categoryItem => categoryItem.name == categoryName);
        if (-1 == categoryIndex) {
            return null;
        } else {
            categoryId = categoriesList[categoryIndex].id;
            return categoryIndex;
        }
    }

    searchCategoryNameChange(e) {
        var categoryName = e.target.value;
        var categoryId = 0;

        categoryId = this.getSearchId(categoryName);
        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.UPDATE_SEARCH_DATA, categoryId: categoryId,
                             categoryName: categoryName
        });
    }

    render() {
        let mapStyle = {
            color: "#0000FF",
            textAlign: "left"
        };

        let mapSrc = "https://maps.google.com/maps?q=" + this.props.googleMapsCoordinates + "&hl=es;z=14&output=embed";
        let mapBiggerSrc = "https://maps.google.com/maps?q=" + this.props.googleMapsCoordinates + "&hl=es;z=14&output=embed";

        this.initVariables();

        this.validateVariables();

        return (
            <div className="row">
                <div className="col-md-6 panelTitle">Location Page</div>

                <div className="col-md-6">
                    <button className="btn btn-primary mainBtn pull-left"
                            onClick={this.showAddLocationRow.bind(this)}
                            disabled={this.props.showAddLocationRow || this.props.editLocationIndex > -1}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
                        Add Location
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="category_name" className="col-sm-3">Search:</label>

                    <div className="col-md-3">
                        <Combo id="category_name" items={this.props.categoriesList}
                               itemIdProperty="id"
                               itemDisplayProperty='name'
                               value={this.props.searchCategoryName}
                               onChange={this.searchCategoryNameChange.bind(this)} />
                    </div>

                    <div className="col-md-6">{'\u00A0'}</div>
                </div>

                <div className="col-md-12" style={{marginTop: '10px'}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name {this.renderSortIcon()}</th>
                            <th>Categories</th>
                            <th>Address</th>
                            <th>Coordinates</th>
                            <th>{'\u00A0'}</th>
                        </tr>
                        </thead>

                        {this.renderLocationsList()}
                    </table>
                </div>

                <EditCategoriesModal/>

                <ModalWindow show={this.props.showDeleteModalDialog}
                             buttonOk={this.deleteLocation.bind(this)}
                             buttonCancel={this.hideDeleteModalDialog.bind(this)}
                             buttonX={this.hideDeleteModalDialog.bind(this)}
                             title={this.props.deleteModalHeader} style={{zIndex: '9001'}}>
                    <div>Are you sure ?</div>
                </ModalWindow>

                <ModalWindow show={this.props.showGoogleMap}
                             buttonOk={this.hideGoogleMap.bind(this)}
                             buttonCancel={this.hideGoogleMap.bind(this)}
                             buttonX={this.hideGoogleMap.bind(this)}
                             title="Google Map" style={{zIndex: '9001'}}>
                    <iframe width="300" height="170" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                            src={mapSrc}>
                    </iframe>
                    <br />
                    <small>
                        <a href={mapBiggerSrc} style={mapStyle} target="_blank">See map bigger</a>
                    </small>
                </ModalWindow>

                <ModalWindow show={this.props.showGoogleMapApi}
                             buttonOk={this.saveGoogleApiModalCoordinates.bind(this)}
                             buttonCancel={this.hideGoogleMapApiModal.bind(this)}
                             buttonX={this.hideGoogleMapApiModal.bind(this)}
                             title="Google Map API" style={{zIndex: '9001'}}>
                    <div>
                        Coordinates: {this.props.googleApiMap.lat + ',' + this.props.googleApiMap.lng}
                    </div>

                    {this.renderGoogleApiMap()}
                </ModalWindow>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        categoriesList: state.categories.categoriesList,
        sortDirection: state.locations.sortDirection,
        sortField: state.locations.sortField,
        locationsList: state.locations.locationsList,
        locationData: state.locations.locationData,
        showDeleteModalDialog: state.locations.showDeleteModalDialog,
        deleteModalHeader: state.locations.deleteModalHeader,
        deleteLocationIndex: state.locations.deleteLocationIndex,
        editLocationIndex: state.locations.editLocationIndex,
        showGoogleMap: state.locations.showGoogleMap,
        showAddLocationRow: state.locations.showAddLocationRow,
        showLocationEditCategoriesModal: state.locations.showLocationEditCategoriesModal,
        googleMapsCoordinates: state.locations.googleMapsCoordinates,
        googleApiMap: state.locations.googleApiMap,
        showGoogleMapApi: state.locations.showGoogleMapApi,
        searchCategoryId: state.locations.searchCategoryId,
        searchCategoryName: state.locations.searchCategoryName
    }
}

export default connect(mapStateToProps)(withRouter(Location));