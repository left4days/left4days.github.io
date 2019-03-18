import React from 'react';
import { Column, Row } from 'ui/Layout';
import handIcon from 'statics/hand.svg';
import style from './style.scss';

class Clicker extends React.Component {
    state = { count: 0 };

    handleClick = () => {
        const { count } = this.state;
        this.setState({ count: count + 1 });
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
