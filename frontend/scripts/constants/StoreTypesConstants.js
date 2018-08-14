import { types } from 'mobx-state-tree';

import Status from './StatusConstants';

const StatusType = types.optional(types.enumeration(
  'status',
  [Status.LOADING, Status.SUCCESS, Status.ERROR, Status.NO_RESULTS, Status.DEFAULT]
), Status.DEFAULT);

const SortField = types.optional(types.enumeration(
  'sortField',
  ['', 'name', 'quantity', 'cost']
), '');

const Params = types.model('params', {
  search: '',
  sortField: SortField,
  sortDirection: types.optional(types.enumeration('sortDirection', ['asc', 'desc']), 'asc')
});

const Purchase = types.model({
  id: -1,
  name: '',
  quantity: '',
  cost: '',
  completed: false,
});

export { StatusType, Params, Purchase };
