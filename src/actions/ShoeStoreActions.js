export function addStore(id=0, name='', address='') {
  return {
    type: 'ADD_STORE',
    payload: {
      id: id,
      name: name,
      address: address
    }
  }
}

export function updateStore(id='', name='', address='') {
  return {
    payload: {
      id: id,
      name: name,
      address: address
    }
  }
}

export function removeStore(storeId) {
  return {
    type: 'REMOVE_STORE',
    payload: {
      storeId: storeId
    }
  }
}
