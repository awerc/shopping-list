import React from 'react';
import PropTypes from 'prop-types';
import Status from '../constants/StatusConstants';

import SvgIcon from './SvgIcon';

const defineIcon = status => {
  switch (status) {
    case Status.SUCCESS:
      return 'success';
    case Status.ERROR:
      return 'error';
    case Status.NO_RESULTS:
    default:
      return 'no-result';
  }
};

const defineMessage = status => {
  switch (status) {
    case Status.SUCCESS:
      return 'Успешно';
    case Status.ERROR:
      return 'Ошибка сервера';
    case Status.NO_RESULTS:
      return 'Нет данных';
    default:
      return 'Загрузка...';
  }
};

const Loader = ({ status, noMessage }) => (
  <div className="loader" data-status={status}>
    {status === Status.LOADING
      ? <div className="spinner" />
      : <SvgIcon id={defineIcon(status)} />
    }
    {!noMessage && <div className="message">{defineMessage(status)}</div>}
  </div>
);

Loader.propTypes = {
  status: PropTypes.string,
  noMessage: PropTypes.bool,
};

Loader.defaultProps = {
  status: Status.DEFAULT,
};

export default Loader;
