import React from 'react';
import { Auth } from 'widgets/Auth';

const MODALS = {
    auth: <Auth authType="auth" />,
    login: <Auth authType="login" />,
    default: null,
};

export function getModal(type) {
    if (MODALS.hasOwnProperty(type)) {
        return MODALS[type];
    }
    return MODALS.default;
}
