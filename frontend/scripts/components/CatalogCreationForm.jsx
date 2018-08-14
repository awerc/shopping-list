import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Glyphicon } from 'react-bootstrap';

import Field from './Field';
import { required } from '../constants/ValidationRules';

const CatalogCreationForm = ({ className, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{ name: 'Список покупок' }}
    render={({ handleSubmit, form, values }) => (
      <form className={className} onSubmit={handleSubmit}>
        <Field inline className="test-classname" name="name" placeholder="Название" type="text" validate={required} />
        <Glyphicon glyph="ok" onClick={() => onSubmit(values)} />
      </form>
    )}
  />
);

CatalogCreationForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func
};

export default CatalogCreationForm;
