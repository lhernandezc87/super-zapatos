import {combineReducers} from 'redux';

import shoes from "./ShoeReducer"
import stores from "./ShoeStoreReducer"
import storeId from "./ShoeStoreReducer"

export default combineReducers({
  shoes, stores, storeId
});
