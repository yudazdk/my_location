import React from 'react';
import { withRouter } from 'react-router';

import Footer from './Footer';


class App extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;