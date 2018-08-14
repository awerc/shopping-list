import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';

const FIELDS = [
  { name: '', alias: 'Нет' },
  { name: 'name', alias: 'Название' },
  { name: 'quantity', alias: 'Количество' },
  { name: 'cost', alias: 'Цена' }
];

class SortControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: '',
      alias: 'Нет',
      direction: 'asc',
    };
  }

  handleDirectionChange = direction => () => {
    this.setState({ direction });
    this.props.onDirectionChange(direction);
  };

  handleFieldChange = (field, alias) => () => {
    this.setState({ field, alias });
    this.props.onFieldChange(field);
  };

  render() {
    const { field, alias, direction } = this.state;

    return (
      <div className="sort">
        <span>Сортировка: </span>
        <DropdownButton
          pullRight
          bsStyle="default"
          title={alias}
          id="sort-field"
        >
          {FIELDS.map(({ name, alias }) => (
            <MenuItem key={name} active={field === name} onClick={this.handleFieldChange(name, alias)}>{alias}</MenuItem>
          ))}
        </DropdownButton>{' '}
        {direction === 'asc'
          ? <Glyphicon className="direction" glyph="sort-by-attributes" onClick={this.handleDirectionChange('desc')} />
          : <Glyphicon className="direction" glyph="sort-by-attributes-alt" onClick={this.handleDirectionChange('asc')} />
        }
      </div>
    );
  }
}

SortControl.propTypes = {
  onFieldChange: PropTypes.func,
  onDirectionChange: PropTypes.func,
};

export default SortControl;
