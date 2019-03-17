import React from 'react';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';

function HeaderAuth() {
    return (
        <Row jc="flex-end">
            <Button size="l" style="fill">
                Регистрация
            </Button>
            <Button size="s">Вход</Button>
        </Row>
    );
}

export { HeaderAuth };
