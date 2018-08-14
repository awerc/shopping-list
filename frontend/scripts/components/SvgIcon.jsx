import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sprite from '../../images/sprite.svg';

const SvgIcon = ({ className, id, ...other }) => {
  const classes = classNames('svg-icon', id, className);

  return (
    <svg {...other} className={classes}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SvgIcon;
