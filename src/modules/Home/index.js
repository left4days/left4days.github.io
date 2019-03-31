import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Clicker } from 'widgets/Clicker';
import { HomeHeader } from './components/HomeHeader';
import { HomeLabels } from './components/HomeLabels';
import { HomeInfo } from './components/HomeInfo';
import style from './style.scss';

function Home() {
    return (
        <Column className={style.home}>
            <Column className={style.home__container}>
                <HomeHeader />
                <HomeLabels />
                <Column ai="center">
                    <HomeInfo />
                    <Clicker />
                </Column>
            </Column>
        </Column>
    );
}

export { Home };
