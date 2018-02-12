import _ from 'lodash';

export function addShoe(id=0, name='', description='', price=0, total=0, storeId=0) {
   var data = {id: id, name: name, description: description, price: price, total: total, storeId: storeId}
  return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(shoes_url_json, {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
             })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({type: "ADD_SHOE", payload: data})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "ADD_SHOE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
  }
}

export function updateShoe(id=0, name='', description='', price=0, total=0, storeId=0) {
  
  var data = {id: id, name: name, description: description, price: price, total: total, storeId: storeId};

  return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(get_update_delete_url(id), {
                method: "PUT",
                body: JSON.stringify(data),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
             })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({type: "UPDATE_SHOE", payload: data})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "UPDATE_SHOE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
    }
}

export function removeShoe(shoeId) {
  return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(get_update_delete_url(shoeId), {
                method: "DELETE",
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
             })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({type: "REMOVE_SHOE", payload: shoeId})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "REMOVE_SHOE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
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

export function loadShoes() {

    return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(shoes_url_json, {method: "GET"})
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({type: "LOAD_SHOES", payload: data})
          //ispatch({type: "LOADING_STORES", payload: false})        
        })
      .catch(function(error) {
        dispatch({ type: "LOAD_SHOES", payload: [], error: true})
        //dispatch({type: "LOADING_STORES", payload: false})      
      });
    }
  }

function get_update_delete_url(id) {
  return _.join([shoes_url_json, id], "/"); 
}

const shoes_url_json = 'http://localhost:4000/shoes'
