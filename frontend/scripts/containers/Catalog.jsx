import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { Glyphicon } from 'react-bootstrap';

import ContentStatus from '../components/ContentStatus';
import OverlayStatus from '../components/OverlayStatus';
import PurchaseCreationForm from '../components/PurchaseCreationForm';
import SortControl from '../components/SortControl';
import SearchInput from '../components/SearchInput';

@inject('catalog')
@observer
class Catalog extends Component {
  componentDidMount = this.props.catalog.getCatalog(this.props.match.params.id);

  componentWillReceiveProps = nextProps => {
    this.props.catalog.clearState();
    this.props.catalog.getCatalog(nextProps.match.params.id);
  };

  handlePurchaseCreate = purchase => this.props.catalog.addPurchase(this.props.match.params.id, purchase);

  handlePurchaseStatusUpdate = (purchaseId, status) => () => this.props.catalog.updatePurchaseStatus(purchaseId, status);

  handlePurchaseRemove = purchaseId => () => this.props.catalog.removePurchase(purchaseId);

  handlePurchaseSearch = search => this.props.catalog.paramsChange('search', search);

  handleSortFieldChange = field => this.props.catalog.paramsChange('sortField', field);

  handleSortDirectionChange = direction => this.props.catalog.paramsChange('sortDirection', direction);

  render() {
    const { purchases, status, creatingStatus } = this.props.catalog;

    return (
      <div className="catalog">
        <div className="header">
          <SearchInput onSearch={this.handlePurchaseSearch} />
        </div>

        <OverlayStatus status={creatingStatus}>
          <PurchaseCreationForm onSubmit={this.handlePurchaseCreate} />
        </OverlayStatus>

        <ContentStatus status={status}>
          <SortControl onDirectionChange={this.handleSortDirectionChange} onFieldChange={this.handleSortFieldChange} />

          <div className="purchases">
            {purchases.map(({ id, name, quantity, cost, completed }) => (
              <div key={id} className={classNames('purchase', { completed })}>
                <div className="name" onClick={this.handlePurchaseStatusUpdate(id, !completed)}>
                  {name}
                </div>
                <div className="quantity">{quantity}</div>
                <div className="cost">{cost}</div>
                <div className="controls">
                  <Glyphicon glyph="remove" onClick={this.handlePurchaseRemove(id)} />
                </div>
              </div>
            ))}
          </div>
        </ContentStatus>
      </div>
    );
  }
}

Catalog.propTypes = {
  match: PropTypes.object
};

Catalog.wrappedComponent.propTypes = {
  catalog: PropTypes.object
};

export default Catalog;
