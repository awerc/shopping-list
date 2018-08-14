import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Button, Row, Col } from 'react-bootstrap';

const SearchInput = ({ onSearch }) => {
  const onSubmit = event => {
    event.preventDefault();
    onSearch(event.target.search.value);
  };

  return (
    <form
      className="search-input"
      onSubmit={onSubmit}
    >
      <FormGroup>
        <Row>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Поиск..."
              name="search"
            />
          </Col>
          <Col sm={2}>
            <Button block bsStyle="primary" type="submit">Поиск</Button>
          </Col>
        </Row>
      </FormGroup>
    </form>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func
};

export default SearchInput;
