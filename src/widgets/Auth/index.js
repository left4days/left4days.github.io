import React from 'react';
import Formsy from 'formsy-react';
import axios from 'axios';

import { Input } from 'widgets/fields';
import { Column } from 'ui/Layout';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Description } from 'ui/Description';
import { getValidationForField } from './validations';
import config from './config';
import { AuthSocial } from './AuthSocial';

import style from './style.scss';

function loginUser(data) {
    return axios.post('/api/v1/user/login', data).then(function(res) {
        console.log('test', res);
    });
}

function registerUser(data) {
    return axios.post('/api/v1/user/', data).then(function(res) {
        console.log('resp', res).catch(function(error) {
            console.log('error', error);
        });
    });
}

function getTitle(authType) {
    if (authType === 'auth') {
        return { title: 'Регистрация', button: 'Зарегистрироваться' };
    }
    return { title: 'Авторизация', button: 'Войти' };
}

function BottomPanel(props) {
    const { authType, getUser } = props;
    if (authType === 'auth') {
        return (
            <Description>
                Нажимая на кнопку Зарегистрироваться, вы подтверждаете свое согласие с
                <a href="#" className={style.auth__link}>
                    Условиями предоставления услуг
                </a>
            </Description>
        );
    }
    return (
        <Row>
            <Button>Регистрация</Button>
            <Button>Забыли пароль?</Button>
            <Button onClick={getUser}>Тест запроса</Button>
        </Row>
    );
}
function AuthHeader({ authType }) {
    return (
        <Column>
            <Title align="center">{getTitle(authType).title}</Title>
            <Description margin="top_x2" align="center">
                с помощью аккаунта в соц. сетях
            </Description>
            <AuthSocial />
            <Description align="center" margin="bottom_x2" className={style.auth__or}>
                или
            </Description>
        </Column>
    );
}

class Auth extends React.Component {
    state = {
        valid: false,
        error: '',
    };

    formRef = ref => (this.form = ref);

    onValid = () => {
        this.setState({ valid: true });
    };

    onInvalid = () => {
        this.setState({ valid: false });
    };

    onSubmit = () => {
        const { authType = 'auth' } = this.props;
        const model = this.form.getModel();
        const actionPromise = authType === 'auth' ? registerUser(model) : loginUser(model);

        actionPromise
            .then(res => {
                console.log('SUCCESS', authType, res);
            })
            .catch(error => {
                console.log('FAIL', authType, error);
            });
    };

    render() {
        const { valid } = this.state;
        const { authType = 'auth' } = this.props;

        return (
            <Column>
                <AuthHeader authType={authType} />
                <Formsy
                    onValidSubmit={this.onSubmit}
                    ref={this.formRef}
                    onValid={this.onValid}
                    onInvalid={this.onInvalid}
                >
                    {config[authType].map((item, i) => {
                        const { type, id, name, placeholder, validations, validationsError, margin } = item;
                        return (
                            <Input
                                validations={getValidationForField(validations)}
                                margin={margin}
                                key={i}
                                validationError={validationsError}
                                required
                                type={type}
                                id={id}
                                placeholder={placeholder}
                                name={name}
                            />
                        );
                    })}
                    <Button
                        className={style.auth__button}
                        type="submit"
                        size="full"
                        margin="bottom_x2"
                        disabled={!valid}
                    >
                        {getTitle(authType).button}
                    </Button>
                    <BottomPanel authType={authType} />
                </Formsy>
            </Column>
        );
    }
}

export { Auth };
