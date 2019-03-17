import React from 'react';
import { Row, Column } from 'ui/Layout';
import { HeaderAuth } from './HeaderAuth';
import fireCudaLogo from 'statics/logo_firecuda.svg';
import logo from 'statics/logo.svg';
import style from './style.scss';

function Header() {
    return (
        <Row className={style.header} jc="space-between">
            <img src={fireCudaLogo} alt="firecuda" />
            <img src={logo} alt="logo" />
            <HeaderAuth />
        </Row>
    );
}

export { Header };
