import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';
import get from 'lodash/get';
import firebase from 'firebase';

import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';

import { Button } from 'ui/Button';
import { Row, Column } from 'ui/Layout';

import './styles.scss';

function SwitchActionStateButton({ actionState, onClick }) {
    const text = actionState === 'ACTIVE' ? 'Закончить розыгрыш' : 'Возобновить розыгрыш';

    return <Button onClick={onClick}>{text}</Button>;
}

function UserRow({ user, idx = '№' }) {
    const { login = '-', clicks = 0, registerBy = '-' } = user;

    return (
        <Row className="admin-panel__table-row">
            <div>{idx}.</div>
            <p>{login}</p>
            <p>{registerBy}</p>
            <p>{clicks}</p>
        </Row>
    );
}

class AdminPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            topClickers: [],
            winners: [],
            isUserAdmin: false,
            actionState: 'ACTIVE',
        };
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(res => {
            this.getCurrentAppState();
            this.getCurrentWinners();

            return this.updateTop10();
        });

        firebase
            .database()
            .ref('/appState')
            .on('value', snapshot => {
                console.log('changed', snapshot.val());
            });
    };

    getCurrentWinners = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/30', options).then(res => {
            this.setState({ winners: res.data.data, isUserAdmin: true });
        });
    };

    getCurrentAppState = async () => {
        axios.get('/api/v1/appState/state').then(res => {
            this.setState({ actionState: res.data.data });
        });
    };

    updateTop10 = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/top/10', options).then(res => {
            this.setState({ topClickers: res.data.data, isUserAdmin: true });
        });
    };

    determineWinners = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/create/30', options).then(res => {
            this.setState({ winners: res.data.data });
        });
    };

    switchAppState = async currentState => {
        const { actionState } = this.state;
        const options = await getFirebaseHeaderToken();
        const data = { currentState: actionState };
        axios.post('/api/v1/appState/switchState', data, options).then(res => {});
    };

    renderWinnerList = () => {
        const { winners } = this.state;

        return (
            <Column>
                <Row ai="center" jc="space-between" className="admin-panel__table-header">
                    <p>30 победителей:</p>
                    <Button onClick={this.determineWinners}>Определить</Button>
                </Row>
                <Column ai="flex-start" className="admin-panel__top-clickers-wrap">
                    <UserRow user={{ login: 'LOGIN', registerBy: 'REGISTERED BY', email: 'EMAIL', clicks: 'CLICKS' }} />
                    {winners.map((user, i) => (
                        <UserRow key={user.login + user.clicks} idx={i + 1} user={user} />
                    ))}
                </Column>
            </Column>
        );
    };

    renderTop10List = () => {
        const { topClickers, isUserAdmin } = this.state;

        return (
            <Column>
                <Row ai="center" jc="space-between" className="admin-panel__table-header">
                    <p>Топ-10 кликеров:</p>
                    <Button onClick={this.updateTop10}>Обновить</Button>
                </Row>
                <Column ai="flex-start" className="admin-panel__top-clickers-wrap">
                    <UserRow user={{ login: 'LOGIN', registerBy: 'REGISTERED BY', clicks: 'CLICKS' }} />
                    {topClickers.map((user, i) => (
                        <UserRow key={user.login + user.clicks} idx={i + 1} user={user} />
                    ))}
                </Column>
            </Column>
        );
    };

    render() {
        const { className } = this.props;
        const { isUserAdmin, actionState } = this.state;

        if (!isUserAdmin) {
            return <div className="admin-panel-go-away">You have no permissions to see this page</div>;
        }

        return (
            <Column className={cx('admin-panel', className)}>
                <Row className="admin-panel__buttons">
                    <SwitchActionStateButton actionState={actionState} onClick={this.switchAppState} />
                    <Button>Выгрузить полный список участников</Button>
                </Row>
                <Row>
                    {this.renderWinnerList()}
                    {this.renderTop10List()}
                </Row>
            </Column>
        );
    }
}

AdminPanel.propTypes = {
    className: PropTypes.string,
};

AdminPanel.defaultProps = {
    className: '',
};

export { AdminPanel };
