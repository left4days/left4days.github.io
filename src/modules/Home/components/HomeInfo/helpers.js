import React from 'react';

export function countLabel(confirmedClicks) {
    if (confirmedClicks >= 100 && confirmedClicks < 500) {
        return {
            text: '5',
            background: '2',
        };
    }
    if (confirmedClicks >= 500 && confirmedClicks < 1000) {
        return {
            text: '15',
            background: '2',
        };
    }
    if (confirmedClicks >= 1000 && confirmedClicks < 10000) {
        return {
            text: '30',
            background: '3',
        };
    }
    if (confirmedClicks >= 10000 && confirmedClicks < 100000) {
        return {
            text: '50',
            background: '4',
        };
    }
    if (confirmedClicks >= 100000 && confirmedClicks < 200000) {
        return {
            text: '70',
            background: '4',
        };
    }
    if (confirmedClicks >= 200000 && confirmedClicks < 500000) {
        return {
            text: '80',
            background: '4',
        };
    }
    if (confirmedClicks >= 500000) {
        return {
            text: '90',
            background: '4',
        };
    }
    return { background: '1' };
}
