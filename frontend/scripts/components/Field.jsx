import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormGroup, HelpBlock, FormControl, ControlLabel } from 'react-bootstrap';

import { composeValidators } from '../utils/ValidationUtils';

const FormControlAdapter = ({ input, meta, children, ...other }) => {
  if (other.type === 'textarea' || other.type === 'select') {
    other.componentClass = other.type;
    other.type = undefined;
  }

  const error = meta.touched && meta.error ? 'error' : null;

  return (
    <FormGroup controlId={input.name} validationState={error}>
      {other.label && <ControlLabel>{other.label}</ControlLabel>}
      <FormControl {...input} {...other}>
        {children}
      </FormControl>
      {error && <FormControl.Feedback />}
      {error && <HelpBlock>{meta.error}</HelpBlock>}
      {other.help && <HelpBlock>{other.help}</HelpBlock>}
    </FormGroup>
  );
};

FormControlAdapter.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.node,
};

const InputField = ({ validate, ...other }) => {
  if (Array.isArray(validate)) validate = composeValidators(...validate);

  return (
    <Field {...other} validate={validate} component={FormControlAdapter} />
  );
};

InputField.propTypes = {
  validate: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.func
  ])
};

export default InputField;
