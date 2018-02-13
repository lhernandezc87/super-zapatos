import { createSelector } from 'reselect';
import _ from 'lodash';

const getStores = (state) => state.stores;
const getShoes = (state) => state.shoes;
const getSortedStoresColumn = (state) => state.storesSortedColumn;

export const getStoresList = createSelector(
  [getStores],
  (stores) => {
  	return stores;
  }
)

export const getShoesList = createSelector(
  [getShoes],
  (shoes) => {
  	return shoes;
  }
)


export const getSortedStoresList = createSelector(
  [getStores, getSortedStoresColumn],
  (stores, sortedColumn) => {
  	return _.sortBy(stores, [sortedColumn, 'id']);
  }
)