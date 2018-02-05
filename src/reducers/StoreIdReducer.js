export default function StoreId(state = 1, action) {
  switch (action.type){
    case 'UPDATE_STOREID':
      return action.payload.storeId
    default:
      return state;         
  }
}
