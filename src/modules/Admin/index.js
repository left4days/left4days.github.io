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

function SwitchActionStateButton({ state }) {
    if (state === 'ACTIVE') {
        return <Button>Закончить розыгрыш</Button>;
    }

    return <Button>Возобновить розыгрыш</Button>;
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
        };
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(res => {
            const uid = get(res, 'uid', '');
            if (uid) {
                axios.get(`/api/v1/user/${uid}`).then(resData => {
                    // if (get(resData, 'data.role') === 'admin') {
                    return this.updateTop10();
                    // }
                });
            } else {
                return 'not signed';
            }
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
        axios.get('/api/v1/user/winners/30', options).then(res => {
            this.setState({ winners: res.data.data });
        });
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
                    <UserRow user={{ login: 'LOGIN', registerBy: 'REGISTERED BY', clicks: 'CLICKS' }} />
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
        const { className, actionState = {} } = this.props;
        const { isUserAdmin } = this.state;
        const { state = 'ACTIVE' } = actionState;

        if (!isUserAdmin) {
            return <div className="admin-panel-go-away">You have no permissions to see this page</div>;
        }

        return (
            <Column className={cx('admin-panel', className)}>
                <Row className="admin-panel__buttons">
                    <SwitchActionStateButton state={state} />
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
