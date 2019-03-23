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

function UserRow({ user }) {
    const { uid = '', login = '', clicks = 0, registerBy = '' } = user;
    return (
        <Row className="admin-panel__table-row">
            <p>{uid}</p>
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
            topClickers: [
                { login: 'lalka', registerBy: 'email', clicks: 5884 },
                { login: 'nigga', registerBy: 'facebook', clicks: 915 },
                { login: 'petposyan', registerBy: 'google', clicks: 14413 },
            ],
        };
    }

    componentWillMount() {
        axios.get('/api/v1/user/top/10').then(res => {
            console.log(res);
            this.setState({ topClickers: res.data.data });
        });
    }

    render() {
        const { className, actionState = {} } = this.props;
        const { topClickers } = this.state;
        const { state = 'ACTIVE' } = actionState;

        return (
            <Column className={cx('admin-panel', className)}>
                <Row className="admin-panel__buttons">
                    <SwitchActionStateButton state={state} />
                    <Button>Определить победителей</Button>
                    <Button>Выгрузить полный список участников</Button>
                </Row>
                <Row ai="center" className="admin-panel__table-header">
                    <p>Топ-10 кликеров:</p>
                    <Button>Обновить</Button>
                </Row>
                <Column ai="flex-start" className="admin-panel__top-clickers-wrap">
                    {topClickers.map(user => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </Column>
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
