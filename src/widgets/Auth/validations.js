import React from 'react';

function oneLetterOneNumberAtLeast(value) {
    if (!value) return false;
    return /[a-zA-Zа-яА-Я]+/.test(value.toString()) && /\d+/.test(value.toString());
}

function allLettersIsLatin(value) {
    if (!value) return false;
    return /[A-z\u00C0-\u00ff]+/g.test(value.toString());
}

export function getValidationForField(validation) {
    switch (validation) {
        case 'email':
            return 'isEmail';
        case 'login':
            return { matchRegexp: / ^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ };
        case 'password':
            return { matchRegexp: /[A-z\u00C0-\u00ff]+/g && /[a-zA-Zа-яА-Я]+/ };
    }
}
