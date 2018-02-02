export default function StoreId(state = {storeId: 0 }, action) {
  switch (action.type){
    case 'UPDATE_STOREID':
      return {
      	...state, 
      	storeId: action.payload
      }
    default:
      return state;         
  }
}
