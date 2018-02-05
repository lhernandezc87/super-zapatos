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
    type: 'UPDATE_STORE',
    payload: {
      id: id,
      name: name,
      address: address
    }
  }
}

export function removeStore(id) {
  return {
    type: 'REMOVE_STORE',
    payload: {
      id: id
    }
  }
}
