export function addShoe(id=0, name='', description='', price=0, total=0, storeId=0) {
  return {
    type: 'ADD_SHOE',
    payload: {
      id: id,
      name: name,
      description: description,
      price: price,
      total: total,
      storeId: storeId
    }
  }
}

export function updateShoe(id=0, name='', description='', price=0, total=0, storeId=0) {
  return {
    type: 'UPDATE_SHOE',
    payload: {
      id: id,
      name: name,
      description: description,
      price: price,
      total: total,
      storeId: storeId
    }
  }
}

export function removeShoe(shoeId) {
  return {
    type: 'REMOVE_SHOE',
    payload: {
      id: shoeId
    }

  }
}

export function getShoesByStore(storeId = 0) {
  return {
    type: 'GET_SHOES_BY_STORE',
    payload: {
      storeId: storeId
    }
  }
}
