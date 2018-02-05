export default function Shoe(state = [], action) {
  switch (action.type){
    case 'ADD_SHOE':
      return [...state, action.payload]
    case 'UPDATE_SHOE':
      return state.map((shoe) => {
        			if (shoe.id === action.payload.id) {
          				return Object.assign({}, shoe, {
           				  name: action.payload.name,
            			  description: action.payload.description,
            			  price: action.payload.price,
            			  total: action.payload.total
          			});
        			} else {
          				return shoe;
        			}
      			  })            
    case 'REMOVE_SHOE':
      return state.filter(t => t.id !== action.payload.id)
    default:
      return state;         
  }
}
