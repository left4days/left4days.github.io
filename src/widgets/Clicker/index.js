import React from 'react';
import get from 'lodash/get';
import axios from 'axios';

import { Column, Row } from 'ui/Layout';
import { isUserLogged, getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import handIcon from 'statics/hand.svg';

import style from './style.scss';

class Clicker extends React.Component {
    state = { count: 0 };

    handleClick = () => {
        const { count } = this.state;
        this.setState({ count: count + 1 }, async () => {
            const isLogged = await isUserLogged();
            if (isLogged) {
                const data = { count: count + 1 };
                const options = await getFirebaseHeaderToken();
                console.log('Options', options);

                axios
                    .post('/api/v1/click', data, options)
                    .then(res => {
                        console.log('RES', res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                console.log('SIGN IN FOR WIN!');
            }
        });
    };

    render() {
        const { count } = this.state;
        return (
            <Column className={style.clicker}>
                <p className={style.clicker__title}>Ты сделал уже</p>
                <button className={style.clicker__button} onClick={this.handleClick}>
                    <img className={style.clicker__img} src={handIcon} alt="hand-icon" />
                    <p className={style.clicker__count}>{count}</p>
                    <p className={style.clicker__text}>кликов</p>
                </button>
            </Column>
        );
    }
}

export { Clicker };
