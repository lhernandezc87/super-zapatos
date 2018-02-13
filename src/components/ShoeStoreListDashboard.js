import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import EditableShoeStoreList from './EditableShoeStoreList.js'; 
import ToggleableShoeStoreForm from './ToggleableShoeStoreForm.js';
import ShoeListDashboard from './ShoeListDashboard.js';

import { addStore, updateStore, removeStore, loadStores } from '../actions/ShoeStoreActions';
import { addShoe, updateShoe, removeShoe, loadShoes } from '../actions/ShoeActions';
import { updateStoreId } from '../actions/StoreIdActions';
import { getStoresList, getShoesList } from '../selectors'


class ShoeStoreListDashboard extends React.Component {  
  
  componentDidMount(){
    this.props.loadStores();
    this.props.loadShoes();
  };

  handleCreateFormSubmit = (shoeStore) => {
    this.createShoeStore(shoeStore);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateShoeStore(attrs);
  };

  handleTrashClick = (shoeStoreId) => {
    this.deleteShoeStore(shoeStoreId);
  };


  createShoeStore = (shoeStore) => {
    const newStoreId = (_.last(this.props.shoeStores).id || 0) + 1;
    this.props.addStore(newStoreId.id, shoeStore.name, shoeStore.address);
  };

  updateShoeStore = (attrs) => {
    this.props.updateStore(attrs.id, attrs.name, attrs.address);
  };

  deleteShoeStore = (shoeStoreId) => {
    this.props.removeStore(shoeStoreId);
  };

  //shoe code
  handleCreateFormSubmitShoe = (shoe) => {
    this.createShoe(shoe);
  };

  handleEditFormSubmitShoe = (attrs) => {
    this.updateShoe(attrs);
  };

  handleTrashClickShoe = (shoeId) => {
    this.deleteShoe(shoeId);
  };

  handleSelectedStoreId = (storeId) => {
    this.props.updateStoreId(storeId);
  };

  createShoe = (shoe) => {
    const id = (_.last(this.props.shoes).id || 0) + 1;
    this.props.addShoe(id, shoe.name, shoe.description, shoe.price, shoe.total, this.props.storeId )
  };

  updateShoe = (attrs) => {
    this.props.updateShoe(attrs.id, attrs.name, attrs.description, attrs.price, attrs.total, this.props.storeId);
  };

  deleteShoe = (shoeId) => {
    this.props.removeShoe(shoeId);
  };

  render() {
    const currentShoeList = _.filter(this.props.shoes, {storeId: this.props.storeId});
    return (
      <div className="appContainer">     
        <div className='storesContainer'>
          <EditableShoeStoreList
            shoeStores={this.props.shoeStores}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onSelectedStoreId={this.handleSelectedStoreId}
          />
          <ToggleableShoeStoreForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
        <div className="shoesContainer">
          <ShoeListDashboard 
            onFormSubmitShoe={this.handleEditFormSubmitShoe}
            onTrashClickShoe={this.handleTrashClickShoe}
            CreateFormSubmitShoe={this.handleCreateFormSubmitShoe}
            shoeList={currentShoeList}
          />
        </div>
      </div>   
    );
  }
}

ShoeStoreListDashboard.propTypes = {
  addShoe: PropTypes.func,
  addStore: PropTypes.func,
  updateStore: PropTypes.func,
  updateShoe: PropTypes.func,
  removeShoe: PropTypes.func,
  removeStore: PropTypes.func,
  updateStoreId: PropTypes.func,
  loadStores: PropTypes.func,
  loadShoes: PropTypes.func
};

const mapStateToProps = (state) => ({
  shoeStores: getStoresList(state),
  shoes: getShoesList(state),
  //shoeStores: state.stores,
  //shoes: state.shoes,
  storeId: state.storeId
});

const mapDispatchToProps = (dispatch) => ({
  addShoe: (id, name, description, price, total, storeId) => { dispatch(addShoe(id, name, description, price, total, storeId)) },
  updateShoe: (id, name, description, price, total, storeId) => { dispatch(updateShoe(id, name, description, price, total, storeId)) },
  removeShoe: (id) => {dispatch(removeShoe(id))},
  addStore: (id, name, address) => { dispatch(addStore(id, name, address)) },
  updateStore: (id, name, address) => { dispatch(updateStore(id, name, address)) },
  removeStore: (id) => { dispatch(removeStore(id)) },
  updateStoreId: (id) =>  { dispatch(updateStoreId(id)) },
  loadStores: () => { dispatch(loadStores()) },
  loadShoes: () => { dispatch(loadShoes()) }
});


export default connect(mapStateToProps, mapDispatchToProps)(ShoeStoreListDashboard);
