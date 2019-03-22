import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Column, Row } from 'ui/Layout';

import style from './style.scss';

function DropDown({ isOpen, signOutUser }) {
    if (!isOpen) {
        return null;
    }
    return (
        <Column className={style.dropdown}>
            <button onClick={signOutUser} className={style.dropdown__button}>
                Log Out
            </button>
        </Column>
    );
}

class HeaderAuthAuthorized extends React.Component {
    state = { isOpen: false };

    handleOpenDropdown = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    };

    handleClickOutside = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const {
            user: { email },
            signOutUser,
        } = this.props;
        const { isOpen } = this.state;
        return (
            <Row jc="flex-end" ai="center" className={style.header__authorized}>
                <p className={style.header__user} onClick={this.handleOpenDropdown}>
                    {email}
                </p>
                <DropDown isOpen={isOpen} signOutUser={signOutUser} />
            </Row>
        );
    }
}

HeaderAuthAuthorized = onClickOutside(HeaderAuthAuthorized);

export { HeaderAuthAuthorized };
