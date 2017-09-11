import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import ModalWindow from './global/ModalWindow';

import * as LocationActions from '../actions/LocationActions';


class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null
        };
    }

    mapMoved() {
        let centerJson = (JSON.stringify(this.state.map.getCenter()));

        let location = JSON.parse(centerJson);

        this.props.dispatch({type: LocationActions.ActionTypes.LOCATION.UPDATE_GOOGLE_API_COORDINATES,
                             lat: location.lat, lng: location.lng});
    }

    mapLoaded(map) {
        if ( this.state.map != null ) {
            return;
        }

        this.setState({map: map});
    }

    render() {

        const apiKey = "AIzaSyDEpTtSKIgFmw9mJ5ULALRt7rDXmcRFW9I";

        const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=" + apiKey;

        const markers = [];

        return (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                googleMapURL={googleMapURL}
                onDragEnd={this.mapMoved.bind(this)}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.googleApiMap}>
                {markers.map((marker, index) => (
                    <Marker {...marker}/>
                ))}
            </GoogleMap>
        );
    }
}

export default withGoogleMap(Map);