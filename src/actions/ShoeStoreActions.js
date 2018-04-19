import _ from 'lodash';

export function addStore(id=0, name='', address='') {
  var data = {id: id, name: name, address: address}
  return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(stores_url_json, {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
             })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({type: "ADD_STORE", payload: data})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "ADD_STORE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
    }  
}

export function updateStore(id='', name='', address='') {
  var data = {id: id, name: name, address: address}
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
              dispatch({type: "UPDATE_STORE", payload: data})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "UPDATE_STORE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
    }
}

export function removeStore(id='') {

  return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(get_update_delete_url(id), {
                method: "DELETE",
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
             })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({type: "REMOVE_STORE", payload: id})
              //ispatch({type: "LOADING_STORES", payload: false})        
            })
          .catch(function(error) {
            dispatch({ type: "REMOVE_STORE", payload: [], error: true})
            //dispatch({type: "LOADING_STORES", payload: false})      
          });
    }
}

export function loadStores() {

    return dispatch => {
      //dispatch({type: "LOADING_STORES", payload: true})
      return fetch(stores_url_json, {method: "GET"})
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({type: "LOAD_STORES", payload: data})
          //ispatch({type: "LOADING_STORES", payload: false})        
        })
      .catch(function(error) {
        dispatch({ type: "LOAD_STORES", payload: [], error: true})
        //dispatch({type: "LOADING_STORES", payload: false})      
      });
    }
}

function get_update_delete_url(id) {
  return _.join([stores_url_json, id], "/"); 
}

const stores_url_json = 'http://localhost:4000/stores'