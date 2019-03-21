import React from 'react';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';

function HeaderAuthAuthorized({ user }) {
    const { email } = user;
    return <p>{email}</p>;
}

function HeaderAuth({ handleModal, user }) {
    if (user) {
        return <HeaderAuthAuthorized user={user} />;
    }
    return (
        <Row jc="flex-end" ai="center">
            <Button size="l" style="fill" margin="right_x2" onClick={() => handleModal('auth')}>
                Регистрация
            </Button>
            <Button size="s" onClick={() => handleModal('login')}>
                Вход
            </Button>
        </Row>
    );
}

export { HeaderAuth };
