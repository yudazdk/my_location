import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router';

import Map from './Map';


class Test extends React.Component {

    render() {

        const center = {
            lat: 32.7751504,
            lng: 35.0138433
        };

        const containerElement = <div style={{ height: 400 }} />;
        const mapElement = <div style={{ height: 400 }} />;

        return (
            <div>
                <h1>Testing map</h1>

                <div>
                    Coordinates: {this.props.googleApiMap.coordinates}
                </div>


                <div>
                    <Map containerElement={containerElement} mapElement={mapElement} center={center} zoom={8}
                         dispatch={this.props.dispatch}/>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        googleApiMap: state.locations.googleApiMap
    }
}

export default connect(mapStateToProps)(withRouter(Test));