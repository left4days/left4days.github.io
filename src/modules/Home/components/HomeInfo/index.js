import React from 'react';
import { Column, Row } from 'ui/Layout';
import groupIcon from 'statics/group.svg';
import { countLabel } from './helpers';
import style from './style.scss';

function renderText(confirmedClicks) {
    if (!confirmedClicks || confirmedClicks < 100) {
        return 'Кликай и зарабатывай очки!';
    }
    return `Поздравляю! Ты сделал больше кликов чем ${countLabel(confirmedClicks).text}% других участников!`;
}

function HomeInfo({ confirmedClicks }) {
    return (
        <Column className={style.home__info}>
            <img className={style.home__info_image} src={groupIcon} alt="group-icon" />
            <p className={style.home__info_description}>{renderText(confirmedClicks)}</p>
        </Column>
    );
}

export { HomeInfo };
