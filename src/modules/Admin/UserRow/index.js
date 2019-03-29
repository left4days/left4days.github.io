import React from 'react';
import { Row, Column } from 'ui/Layout';
import style from './style.scss';

function getHref(login, email, registerBy) {
    switch (registerBy) {
        case 'email':
            return `mailto:${email}?subject="Поздравляем!%20Вы%20выиграли%20приз%20в%20конкурсе%20от%20Empire&amp;body="Test%20body"`;
        case 'vk':
            return `vk.com/${login}`;
        default:
            return '#';
    }
}

function UserRow({ user, idx = '№', withLink }) {
    const { login = '-', clicks = 0, registerBy = '-', email = '-' } = user;

    return (
        <Row className={style.admin__row}>
            <p className={style.admin__row_item}>{idx}</p>
            <p className={style.admin__row_item}>{login}</p>
            <p className={style.admin__row_item}>{email}</p>
            <p className={style.admin__row_item}>{registerBy}</p>
            <p className={style.admin__row_item}>{clicks}</p>
            <a href={getHref(login, email, registerBy)} rel="noopener nooferrer">
                Send message
            </a>
        </Row>
    );
}

export { UserRow };
