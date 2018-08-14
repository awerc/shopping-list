import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button, Row, Col } from 'react-bootstrap';

import Field from './Field';
import { required } from '../constants/ValidationRules';

const PurchaseCreationForm = ({ onSubmit }) => (
  <Form
    onSubmit={values => {
      onSubmit({ ...values, completed: false });
    }}
    render={({ handleSubmit, form }) => (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Field name="name" placeholder="Наименование" type="text" validate={required} />
          </Col>
          <Col sm={2}>
            <Field name="quantity" placeholder="Кол-во" type="text" />
          </Col>
          <Col sm={2}>
            <Field name="cost" placeholder="Цена" type="text" />
          </Col>
          <Col sm={2}>
            <Button block bsStyle="primary" type="submit">
              Добавить
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);

PurchaseCreationForm.propTypes = {
  onSubmit: PropTypes.func
};

export default PurchaseCreationForm;
