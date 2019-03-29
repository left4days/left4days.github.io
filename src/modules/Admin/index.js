import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import firebase from 'firebase';

import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import { Button } from 'ui/Button';
import { Title } from 'ui/Title';
import { Row, Column } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { UserRow } from './UserRow';
import { UserHeading } from './UserHeading';

import style from './style.scss';

function SwitchActionStateButton({ actionState, onClick }) {
    const text = actionState === 'ACTIVE' ? 'Закончить розыгрыш' : 'Возобновить розыгрыш';

    return <Button onClick={onClick}>{text}</Button>;
}

function Table({ text, onClick, buttonText, data }) {
    return (
        <Column>
            <UserHeading text={text} onClick={onClick} buttonText={buttonText} />
            <Column ai="flex-start">
                <UserRow
                    user={{
                        login: 'LOGIN',
                        email: 'EMAIL',
                        registerBy: 'REGISTERED BY',
                        clicks: 'CLICKS',
                        contact: 'CONTACT',
                    }}
                />
                {data.map((user, i) => (
                    <UserRow withLink key={user.login + user.clicks} idx={i + 1} user={user} />
                ))}
            </Column>
        </Column>
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
        firebase.auth().onAuthStateChanged(() => {
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

    render() {
        const { isUserAdmin, actionState, winners, topClickers } = this.state;

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
                    <Table
                        text="30 победителей"
                        onClick={this.determineWinners}
                        buttonText="Определить"
                        data={winners}
                    />
                    <Table
                        text="Топ-10 кликеров:"
                        onClick={this.updateTop10}
                        buttonText="Обновить"
                        data={topClickers}
                    />
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
