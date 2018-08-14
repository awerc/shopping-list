import React from 'react';
import PropTypes from 'prop-types';
import Status from '../constants/StatusConstants';

import Loader from './Loader';

const ContentState = ({ status, noMessage, children }) => {
  if (status === Status.SUCCESS || status === Status.DEFAULT) {
    return children;
  }

  return (
    <Loader status={status} noMessage={noMessage} />
  );
};

ContentState.propTypes = {
  status: PropTypes.string,
  children: PropTypes.node,
  noMessage: PropTypes.bool
};

ContentState.defaultProps = {
  status: Status.DEFAULT,
};

export default ContentState;
