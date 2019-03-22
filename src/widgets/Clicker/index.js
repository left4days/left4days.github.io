import React from 'react';
import { Column, Row } from 'ui/Layout';
import handIcon from 'statics/hand.svg';
import axios from 'axios';
import style from './style.scss';

class Clicker extends React.Component {
    state = { count: 0 };

    handleClick = () => {
        const { count } = this.state;
        console.log('Clicked', count + 1);
        this.setState({ count: count + 1 }, () => {
            const authUser = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
            console.log('USER', window);
            axios
                .post(
                    '/api/v1/click',
                    { count: count + 1 },
                    {
                        headers: {
                            FIREBASE_AUTH_TOKEN: '123',
                        },
                    }
                )
                .then(res => {
                    console.log('RES', res.data);
                })
                .catch(error => {
                    console.log(error);
                });
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
