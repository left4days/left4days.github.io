import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import firebase from 'firebase';

import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import { Button } from 'ui/Button';
import { Title } from 'ui/Title';
import { Row, Column } from 'ui/Layout';
import { UserRow } from './UserRow';
import { UserHeading } from './UserHeading';

import style from './style.scss';

function SwitchActionStateButton({ actionState, onClick }) {
    const text = actionState === 'ACTIVE' ? 'Закончить розыгрыш' : 'Возобновить розыгрыш';

    return <Button onClick={onClick}>{text}</Button>;
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
                <UserHeading text="30 победителей:" onClick={this.determineWinners} buttonText="Определить" />
                <Column ai="flex-start">
                    <UserRow user={{ login: 'LOGIN', registerBy: 'REGISTERED BY', email: 'EMAIL', clicks: 'CLICKS' }} />
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
                <UserHeading text="Топ-10 кликеров:" onClick={this.updateTop10} buttonText="Обновить" />
                <Column ai="flex-start">
                    <UserRow user={{ login: 'LOGIN', registerBy: 'REGISTERED BY', clicks: 'CLICKS' }} />
                    {topClickers.map((user, i) => (
                        <UserRow key={user.login + user.clicks} idx={i + 1} user={user} />
                    ))}
                </Column>
            </Column>
        );
    };

    render() {
        const { isUserAdmin, actionState } = this.state;

        if (!isUserAdmin) {
            return <Title containerClassName={style.admin__rejected}>You have no permissions to see this page</Title>;
        }

        return (
            <Column className={style.admin}>
                <Row className={style.admin__header}>
                    <SwitchActionStateButton actionState={actionState} onClick={this.switchAppState} />
                    <Button style="void" margin="left">
                        Выгрузить полный список участников
                    </Button>
                </Row>
                <Column>
                    {this.renderWinnerList()}
                    {this.renderTop10List()}
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
