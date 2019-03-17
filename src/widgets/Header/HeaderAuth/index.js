import React from 'react';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';

function HeaderAuth({ handleModal }) {
    return (
        <Row jc="flex-end" ai="center">
            <Button size="l" style="fill" margin="right_x2" onClick={() => handleModal('auth')}>
                Регистрация
            </Button>
            <Button size="s" onClick={() => handleModal('auth')}>
                Вход
            </Button>
        </Row>
    );
}

export { HeaderAuth };
