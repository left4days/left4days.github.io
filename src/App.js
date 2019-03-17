import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Modal } from 'ui/Modal';
import routes from './routes';

class App extends Component {
    state = { modal: null };

    handleModal = type => {
        this.setState({ modal: type });
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
                <Modal modal={modal} />
            </Router>
        );
    }
}

export default App;
