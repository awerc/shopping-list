import React from 'react';

import { Switch, Route, Redirect } from './components/router';
import Layout from './containers/Layout';
import Catalog from './containers/Catalog';
import NotFound from './components/NotFound';

const App = () => (
  <Layout>
    <Switch>
      <Redirect exact from="/" to="/catalogs/1" />
      <Route path="/catalogs/:id" exact component={Catalog} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
