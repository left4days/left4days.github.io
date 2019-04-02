import React from 'react';
import cx from 'classnames';
import { Column, Row } from 'ui/Layout';
import { Clicker } from 'widgets/Clicker';
import { HomeHeader } from './components/HomeHeader';
import { HomeLabels } from './components/HomeLabels';
import { HomeInfo } from './components/HomeInfo';
import { countLabel } from './components/HomeInfo/helpers.js';
import style from './style.scss';

class Home extends React.Component {
    state = { confirmedClicks: 0 };

    getConfirmedClicks = confirmedClicks => {
        if (!confirmedClicks) {
            return null;
        }
        return this.setState({ confirmedClicks });
    };

    render() {
        const { confirmedClicks } = this.state;
        const { user, handleModal } = this.props;
        return (
            <Column className={cx(style.home, style[`home__background_${countLabel(confirmedClicks).background}`])}>
                <Column className={style.home__container}>
                    <Column>
                        <HomeHeader />
                        <HomeLabels />
                        <Column ai="center">
                            <HomeInfo confirmedClicks={confirmedClicks} />
                            <Clicker
                                getConfirmedClicks={this.getConfirmedClicks}
                                user={user}
                                handleModal={handleModal}
                            />
                        </Column>
                    </Column>
                </Column>
            </Column>
        );
    }
}

export { Home };
