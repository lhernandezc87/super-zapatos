export default function addShoe(state = {shoeList: []}, action) {
  switch (action.type){
    case 'ADD_SHOE':
      return {
      	...state, 
      	shoeList: [...state.shoeList, action.payload]
      }
    case 'UPDATE_SHOE':
      return {
        ...state,
        shoeList: state.shoeList.map((shoe) => {
        			if (shoe.id === action.payload.id) {
          				return Object.assign({}, shoe, {
           				  name: action.payload.name,
            			  description: action.payload.description,
            			  price: action.payload.price,
            			  total: action.payload.total,
            			  storeId: action.payload.storeId,
          			});
        			} else {
          				return shoe;
        			}
      			  }),
      }
    case 'REMOVE_SHOE':
      return {
      	...state,
      	shoeList: [state.shoeList.filter(t => t.id !== action.payload.id)]
      }
    default:
      return state;         
  }
}
