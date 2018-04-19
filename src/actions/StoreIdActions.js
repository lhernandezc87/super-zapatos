export function updateStoreId(storeId=0) {
  return {
    type: 'UPDATE_STOREID',
    payload: {
      storeId: storeId
    }
  }
}
