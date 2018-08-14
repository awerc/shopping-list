import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import Sidebar from './Sidebar';

@inject('catalogList', 'catalog')
@observer
class Layout extends Component {
  handlePurchaseSearch = search => this.props.catalog.paramsChange('search', search);

  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        <Sidebar />
        <div className="layout-content">{children}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node
};

Layout.wrappedComponent.propTypes = {
  catalog: PropTypes.object
};

export default Layout;
