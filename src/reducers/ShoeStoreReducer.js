export default function ShoeStore(state={shoeStoreList: []}, action) {
  switch (action.type){
    case 'ADD_STORE':
      return {
      	...state, 
      	shoeStoreList: [...state.shoeStoreList, action.payload]
      }
    case 'UPDATE_STORE':
      return {
        ...state,
        shoeStoreList: state.shoeStoreList.map((shoeStore) => {
        			if (shoeStore.id === action.payload.id) {
          				return Object.assign({}, shoeStore, {
           				  name: action.payload.name,
            			  address: action.payload.address,
          			});
        			} else {
          				return shoeStore;
        			}
      			  }),
      }
    case 'REMOVE_STORE':
      return {
      	...state,
      	shoeStoreList: [state.shoeStoreList.filter(t => t.id !== action.payload.id)]
      }
    default:
      return state;         
  }
}
