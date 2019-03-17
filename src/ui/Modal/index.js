import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Column } from 'ui/Layout';
import { getModal } from './modals';

import style from './style.scss';

function Modal({ modal }) {
    return (
        <div className={cx(style.modal, modal && style.modal_open)}>
            <Column className={style.modal__inner}>{getModal(modal)}</Column>
        </div>
    );
}

Modal.propTypes = {
    open: PropTypes.bool,
};

Modal.defaultProps = {
    open: false,
};

export { Modal };
