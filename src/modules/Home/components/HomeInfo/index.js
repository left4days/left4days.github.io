import React from 'react';
import { Column, Row } from 'ui/Layout';
import groupIcon from 'statics/group.svg';
import { countLabel } from './helpers';
import style from './style.scss';

function renderText(confirmedClicks, actionState) {
    if (actionState === 'FINISHED') {
        return 'Акция завершена';
    }
    if (!confirmedClicks || confirmedClicks < 100) {
        return 'Кликай и зарабатывай очки!';
    }
    return `Поздравляю! Ты сделал больше кликов чем ${countLabel(confirmedClicks).text}% других участников!`;
}

function HomeInfo({ confirmedClicks, actionState }) {
    return (
        <Column className={style.home__info}>
            <img className={style.home__info_image} src={groupIcon} alt="group-icon" />
            <p className={style.home__info_description}>{renderText(confirmedClicks, actionState)}</p>
        </Column>
    );
}

export { HomeInfo };
