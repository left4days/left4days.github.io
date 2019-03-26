import React from 'react';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import axios from 'axios';
import firebase from 'firebase';

import { Column, Row } from 'ui/Layout';
import { isUserLogged, getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import handIcon from 'statics/hand.svg';

import style from './style.scss';

const DEBOUNCE = 2000; //ms

class Clicker extends React.PureComponent {
    constructor(props) {
        super(props);

        this.lastUpdatedTS = Date.now();
        this.timeoutId = null;

        this.state = {
            confirmedClicks: 10,
            currentSeriesCount: 0,
            displayedClicks: 0,
        };
    }

    componentWillMount() {
        const { confirmedClicks } = this.state;
        const currentUser = get(firebase.auth(), 'currentUser') || {};
        const { uid } = currentUser;

        firebase.auth().onAuthStateChanged(async res => {
            const uid = get(res, 'uid', '');
            const options = await getFirebaseHeaderToken();

            axios.get(`/api/v1/click/${uid}`, options).then(res => {
                const confirmedClicks = get(res, 'data.data.confirmedClicks', 0);
                this.setState({ confirmedClicks, displayedClicks: confirmedClicks });
            });
        });
    }

    registerClicks = () => {
        const { confirmedClicks, currentSeriesCount } = this.state;
        const currentSerie = currentSeriesCount;

        if (currentSerie < 1) {
            return;
        }

        this.setState({ currentSeriesCount: 0 }, async () => {
            const options = await getFirebaseHeaderToken();
            const currentUser = get(firebase.auth(), 'currentUser') || {};
            axios
                .post(`/api/v1/click/`, { count: currentSerie }, options)
                .then(res => {
                    this.setState({ confirmedClicks: confirmedClicks + currentSerie });
                })
                .catch(error => {
                    const { currentSeriesCount } = this.state;
                    console.warn('save locally', currentSeriesCount, currentSerie);
                    setState({ currentSeriesCount: currentSeriesCount + currentSerie });
                });
        });

        this.timeoutId = null;
        this.lastUpdatedTS = Date.now();
    };

    debounceHandle() {
        if (!this.timeoutId && Date.now() >= this.lastUpdatedTS + DEBOUNCE) {
            this.timeoutId = setTimeout(this.registerClicks, DEBOUNCE);
        }
    }

    handleClick = () => {
        const { confirmedClicks, displayedClicks, currentSeriesCount } = this.state;

        this.setState(
            { currentSeriesCount: currentSeriesCount + 1, displayedClicks: displayedClicks + 1 },
            this.debounceHandle()
        );
    };

    render() {
        const { displayedClicks } = this.state;

        return (
            <Column className={style.clicker}>
                <p className={style.clicker__title}>Ты сделал уже</p>
                <button className={style.clicker__button} onClick={this.handleClick}>
                    <img className={style.clicker__img} src={handIcon} alt="hand-icon" />
                    <p className={style.clicker__count}>{displayedClicks}</p>
                    <p className={style.clicker__text}>кликов</p>
                </button>
            </Column>
        );
    }
}

export { Clicker };
