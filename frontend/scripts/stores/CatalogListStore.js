/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { types, flow } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import Status from '../constants/StatusConstants';
import AjaxService from '../services/AjaxService';
import { StatusType } from '../constants/StoreTypesConstants';

const CatalogList = types.model('catalogList', {
  data: types.optional(types.array(types.model('catalog', {
    id: 0,
    name: ''
  })), []),
  status: StatusType,
  creatingStatus: StatusType,
  updatingStatus: StatusType,
  removingStatus: StatusType
}).actions(self => ({
  getCatalogs: flow(function* getCatalogs() {
    self.status = Status.LOADING;
    try {
      const response = yield AjaxService.get('catalogs');

      const data = _.get(response, 'data', []);
      self.data = data;
      self.status = data.length > 0 ? Status.SUCCESS : Status.NO_RESULTS;
    } catch (error) {
      self.status = Status.ERROR;
    }
  }),

  createCatalog: flow(function* createCatalog(catalog) {
    self.creatingStatus = Status.LOADING;
    try {
      const response = yield AjaxService.post('catalogs', catalog);

      self.creatingStatus = Status.SUCCESS;
      self.status = Status.DEFAULT;
      self.data.unshift({ ...catalog, id: response.data.id });
    } catch (error) {
      self.creatingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('creating', Status.DEFAULT), 1000);
  }),

  updateCatalog: flow(function* updateCatalog(catalogId, data) {
    self.updatingStatus = Status.LOADING;
    try {
      yield AjaxService.put(`catalogs/${catalogId}`, data);

      self.updatingStatus = Status.SUCCESS;

      const index = _.findIndex(self.data, { id: catalogId });
      self.data[index] = { id: catalogId, ...data };
    } catch (error) {
      self.updatingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('updating', Status.DEFAULT), 1000);
  }),

  removeCatalog: flow(function* removeCatalog(id) {
    self.removingStatus = Status.LOADING;
    try {
      yield AjaxService.delete(`catalogs/${id}`);

      self.removingStatus = Status.SUCCESS;
      self.data = self.data.filter(catalog => catalog.id !== id);
    } catch (error) {
      self.removingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('removing', Status.DEFAULT), 1000);
  }),

  setStatus(type, status) {
    self[`${type}Status`] = status;
  }

}));

const CatalogListStore = CatalogList.create({
  data: [],
  status: Status.LOADING,
  creatingStatus: Status.DEFAULT,
  removingStatus: Status.DEFAULT
});

makeInspectable(CatalogListStore);

export { CatalogListStore as default, CatalogList };
