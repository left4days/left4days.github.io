import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import get from 'lodash/get';

import { Header } from 'widgets/Header';
import { Modal } from 'ui/Modal';
import routes from './routes';
import { signOutUser } from 'widgets/Auth/firebase-configuration';

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
    state = { modal: null, user: false };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(res => {
            const uid = get(res, 'uid', '');
            if (uid) {
                axios.get(`/api/v1/user/${uid}`).then(resData => {
                    const user = { ...res, userData: resData.data };
                    this.setState({ user, modal: null });
                });
            } else {
                return 'not signed';
            }
        });
    }

    handleModal = type => {
        this.setState({ modal: type });
    };

    handleModalClose = () => {
        this.setState({ modal: null });
    };

    signOutUserAction = () => {
        signOutUser();
        this.setState({ user: false });
    };

    render() {
        const { modal, user } = this.state;
        return (
            <Router>
                <Header handleModal={this.handleModal} signOutUser={this.signOutUserAction} user={user} />
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
