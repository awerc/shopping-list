/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { types, flow } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import Status from '../constants/StatusConstants';
import AjaxService from '../services/AjaxService';
import { StatusType, Purchase, Params } from '../constants/StoreTypesConstants';

const Catalog = types.model('catalog', {
  data: types.optional(types.array(Purchase), []),
  status: StatusType,
  creatingStatus: StatusType,
  updatingStatus: StatusType,
  removingStatus: StatusType,
  params: Params
}).views(self => ({
  get purchases() {
    return _.orderBy(self.data, ['completed', self.params.sortField], ['asc', self.params.sortDirection])
      .filter(purchase => purchase.name.toLowerCase().includes(self.params.search.toLowerCase()));
  }
})).actions(self => ({
  getCatalog: flow(function* getCatalog(catalogId) {
    self.status = Status.LOADING;
    try {
      const response = yield AjaxService.get(`catalogs/${catalogId}`);

      const data = _.get(response, 'data', []);
      self.data = data;
      self.status = data.length > 0 ? Status.SUCCESS : Status.NO_RESULTS;
    } catch (error) {
      self.status = Status.ERROR;
    }
  }),

  addPurchase: flow(function* addPurchase(catalogId, purchase) {
    self.creatingStatus = Status.LOADING;
    try {
      const response = yield AjaxService.post(`catalogs/${catalogId}/purchases`, purchase);

      self.creatingStatus = Status.SUCCESS;
      self.status = Status.DEFAULT;
      self.data.unshift({ ...purchase, id: response.data.id });
    } catch (error) {
      self.creatingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('creating', Status.DEFAULT), 1000);
  }),

  updatePurchase: flow(function* updatePurchase(purchaseId, data) {
    self.updatingStatus = Status.LOADING;
    try {
      yield AjaxService.put(`catalogs/purchases/${purchaseId}`, data);

      self.updatingStatus = Status.SUCCESS;

      const index = _.findIndex(self.data, { id: purchaseId });
      self.data[index] = { id: purchaseId, ...data };
    } catch (error) {
      self.updatingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('updating', Status.DEFAULT), 1000);
  }),

  updatePurchaseStatus: flow(function* updatePurchaseStatus(purchaseId, status) {
    self.updatingStatus = Status.LOADING;

    try {
      yield AjaxService.put(`catalogs/purchases/${purchaseId}/status`, { status });

      self.updatingStatus = Status.SUCCESS;

      const index = _.findIndex(self.data, { id: purchaseId });
      self.data[index].completed = status;
    } catch (error) {
      self.updatingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('updating', Status.DEFAULT), 1000);
  }),

  removePurchase: flow(function* removePurchase(purchaseId) {
    self.removingStatus = Status.LOADING;
    try {
      yield AjaxService.delete(`catalogs/purchases/${purchaseId}`);

      self.removingStatus = Status.SUCCESS;
      self.data = self.data.filter(purchase => purchase.id !== purchaseId);
    } catch (error) {
      self.removingStatus = Status.ERROR;
    }
    setTimeout(() => self.setStatus('removing', Status.DEFAULT), 1000);
  }),

  clearState() {
    self.data = [];
    self.status = Status.LOADING;
  },

  setStatus(type, status) {
    self[`${type}Status`] = status;
  },

  paramsChange(field, value) {
    self.params[field] = value;
  }

}));

const CatalogStore = Catalog.create({
  data: [],
  status: Status.LOADING,
  creatingStatus: Status.DEFAULT,
  removingStatus: Status.DEFAULT,
  params: {}
});

makeInspectable(CatalogStore);

export { CatalogStore as default, Catalog };
