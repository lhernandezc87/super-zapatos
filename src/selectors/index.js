import { createSelector } from 'reselect';

const getStores = (state) => state.stores;
const getShoes = (state) => state.shoes;

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
