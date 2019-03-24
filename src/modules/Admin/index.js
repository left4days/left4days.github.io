import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

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
        };
    }

    componentWillMount = () => {
        this.updateTop10();
    };

    updateTop10 = () => {
        axios.get('/api/v1/user/top/10').then(res => {
            this.setState({ topClickers: res.data.data });
        });
    };

    determineWinners = () => {
        axios.get('/api/v1/user/winners/30').then(res => {
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
        const { topClickers } = this.state;

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
        const { state = 'ACTIVE' } = actionState;

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
