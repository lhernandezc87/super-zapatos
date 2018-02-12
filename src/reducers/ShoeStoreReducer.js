export default function ShoeStore(state=[], action) {
  switch (action.type){
    case 'ADD_STORE':
      return [...state, action.payload]
    case 'UPDATE_STORE':
      return state.map((shoeStore) => {
        			if (shoeStore.id === action.payload.id) {
          				return Object.assign({}, shoeStore, {
           				  name: action.payload.name,
            			  address: action.payload.address,
          			});
        			} else {
          				return shoeStore;
        			}
      			  })
              
    case 'REMOVE_STORE':
      return state.filter(t => t.id !== action.payload)
    case 'LOAD_STORES': {
      if (!action.error) {
        return action.payload;
      }
      return state;
    }
    default:
      return state;         
  }
}
