import React from 'react';
import { Link } from 'react-router';


class Footer extends React.Component {
    render() {
        return (
            <div className="appFooter">
                <div className="col-md-4">{'\u00A0'}</div>

                <div className="col-md-2">
                    <Link to="locations" title="Locations"><i className="fa fa-map-marker"/></Link>
                </div>

                <div className="col-md-2">
                    <Link to="categories">Categories</Link>
                </div>

                <div className="col-md-4">{'\u00A0'}</div>
            </div>
        );
    }
}

export default Footer;