import {combineReducers} from 'redux';

import shoes from "./ShoeReducer"
import stores from "./ShoeStoreReducer"
import storeId from "./StoreIdReducer"

export default combineReducers({
  shoes, stores, storeId
});
