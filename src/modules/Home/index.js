import React from 'react';
import { Column, Row } from 'ui/Layout';
import { HomeHeader } from './components/HomeHeader';
import { HomeLabels } from './components/HomeLabels';
import { HomeInfo } from './components/HomeInfo';
import style from './style.scss';
import { Clicker } from 'widgets/Clicker';

function Home() {
    return (
        <Column className={style.home}>
            <HomeHeader />
            <HomeLabels />
            <Column ai="center">
                <HomeInfo />
                <Clicker />
            </Column>
        </Column>
    );
}

export { Home };
