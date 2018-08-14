import classNames from 'classnames';
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { Glyphicon } from 'react-bootstrap';

import { NavLink } from '../components/router';
import ContentStatus from '../components/ContentStatus';
import SvgIcon from '../components/SvgIcon';
import CatalogCreationForm from '../components/CatalogCreationForm';

@inject('catalogList')
@observer
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false
    };
  }

  componentDidMount = this.props.catalogList.getCatalogs();

  handleCatalogCreate = catalog => {
    this.setState({ creating: false });
    this.props.catalogList.createCatalog(catalog);
  };

  handleCreatingFormOpen = () => this.setState({ creating: true });

  handleCatalogRemove = catalogId => () => this.props.catalogList.removeCatalog(catalogId);

  render() {
    const { data, status } = this.props.catalogList;
    const { creating } = this.state;

    return (
      <div className="sidebar">
        <div className="header">
          <SvgIcon id="shopping-bag" className="logo" />
          <div className="title">Покупки</div>
          <div className="btn add-category" onClick={this.handleCreatingFormOpen}>+</div>
        </div>
        <CatalogCreationForm
          className={classNames('catalog-creation', { visible: creating })}
          onSubmit={this.handleCatalogCreate}
        />
        <ContentStatus status={status} noMessage>
          <ul className="items">
            {data.map(({ id, name }) => (
              <li key={id} className="item">
                <NavLink className="name" to={`/catalogs/${id}`}>{name}</NavLink>
                <div className="controls">
                  <Glyphicon glyph="remove" onClick={this.handleCatalogRemove(id)} />
                </div>
              </li>
            ))}
          </ul>
        </ContentStatus>
      </div>
    );
  }
}

Sidebar.wrappedComponent.propTypes = {
  catalogList: PropTypes.object,
};

export default withRouter(Sidebar);
