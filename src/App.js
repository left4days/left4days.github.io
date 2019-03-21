import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import { Header } from 'widgets/Header';
import { Modal } from 'ui/Modal';
import routes from './routes';

const config = {
    apiKey: 'AIzaSyDDaaOyfmalL4ZzY1tlTneHbmdZ29tkxgc',
    authDomain: 'dragoneggteamepmire.firebaseapp.com',
    databaseURL: 'https://dragoneggteamepmire.firebaseio.com',
    projectId: 'dragoneggteamepmire',
    storageBucket: 'dragoneggteamepmire.appspot.com',
    messagingSenderId: '201187011326',
};

firebase.initializeApp(config);

class App extends Component {
    state = { modal: null };

    handleModal = type => {
        this.setState({ modal: type });
    };

    handleModalClose = () => {
        this.setState({ modal: null });
    };

    render() {
        const { modal } = this.state;

        return (
            <Router>
                <Header handleModal={this.handleModal} />
                <div className="App">
                    {routes.map(route => {
                        const { path, exact, component } = route;
                        return <Route key={path} path={path} exact={exact} component={component} />;
                    })}
                </div>
                <Modal modal={modal} onClose={this.handleModalClose} />
            </Router>
        );
    }
}

export default App;
