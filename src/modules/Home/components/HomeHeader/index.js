import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Title } from 'ui/Title';

import style from './style.scss';

function HomeHeader() {
    return (
        <Column className={style.home__header} jc="center">
            <Title size="l" color="white">
                Драконий клик
            </Title>
            <Title size="l" color="orange">
                Разбей яйцо - получи приз!
            </Title>
        </Column>
    );
}

export { HomeHeader };
