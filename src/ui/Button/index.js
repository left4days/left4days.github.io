import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './style.scss';

function Button({ onClick, className, children, size, disabled, style, type }) {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={cx('ux-button', `ux-button__size_${size}`, `ux-button__style_${style}`, className)}
        >
            {children}
        </button>
    );
}

Button.PropTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['s', 'l', 'full']),
    text: PropTypes.string,
    style: PropTypes.oneOf(['void', 'fill']),
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

Button.defaultProps = {
    size: 's',
    style: 'void',
    disabled: false,
};

export { Button };
