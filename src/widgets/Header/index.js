import React from 'react';
import { Row, Column } from 'ui/Layout';
import { HeaderAuth } from './HeaderAuth';
import fireCudaLogo from 'statics/logo_firecuda.svg';
import logo from 'statics/logo.svg';
import style from './style.scss';

function Header({ handleModal, user, signOutUser }) {
    return (
        <Column className={style.header} ai="center" jc="space-between">
            <Row className={style.header__container}>
                <Column jc="flex-start">
                    <img className={style.header__logo} src={fireCudaLogo} alt="firecuda" />
                </Column>
                <Column>
                    <img className={style.header__logo} src={logo} alt="logo" />
                </Column>
                <HeaderAuth handleModal={handleModal} user={user} signOutUser={signOutUser} />
            </Row>
        </Column>
    );
}

export { Header };
