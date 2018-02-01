export function StoreId(state, action) {
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
