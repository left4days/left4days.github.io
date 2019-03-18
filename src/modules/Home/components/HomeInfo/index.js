import React from 'react';
import { Column, Row } from 'ui/Layout';
import groupIcon from 'statics/group.svg';
import style from './style.scss';

function HomeInfo() {
    return (
        <Column className={style.home__info}>
            <img className={style.home__info_image} src={groupIcon} alt="group-icon" />
            <p className={style.home__info_description}>
                Поздравляю! Ты сделал больше кликов чем 30% других участников!
            </p>
        </Column>
    );
}

export { HomeInfo };
