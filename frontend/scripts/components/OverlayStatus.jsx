import React from 'react';
import PropTypes from 'prop-types';
import Status from '../constants/StatusConstants';

import Loader from './Loader';

const OverlayState = ({ status, children }) => {
  if (!status || status === Status.DEFAULT) {
    return children;
  }

  return (
    <div className="overlay-status" data-status={status}>
      {children}
      <div className="overlay">
        <Loader status={status} />
      </div>
    </div>
  );
};

OverlayState.propTypes = {
  status: PropTypes.string,
  children: PropTypes.node,
};

OverlayState.defaultProps = {
  status: Status.DEFAULT,
};

export default OverlayState;
