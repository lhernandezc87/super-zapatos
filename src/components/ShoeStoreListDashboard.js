import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import EditableShoeStoreList from './EditableShoeStoreList.js'; 
import ToggleableShoeStoreForm from './ToggleableShoeStoreForm.js';
import ShoeListDashboard from './ShoeListDashboard.js';

import { addStore, updateStore, removeStore } from '../actions/ShoeStoreActions';
import { addShoe, updateShoe, removeShoe } from '../actions/ShoeActions';
import { updateStoreId } from '../actions/StoreIdActions';

const defaultStoreList = [
  {id: 1, name: 'Payless San Jose', address: 'San Jose, 25 m este del teatro nacional'},
  {id: 2, name: 'Payless Heredia', address: 'Heredia, 100 m oeste del fortin'},
  {id: 3, name: 'Payless Cartago', address: 'cartago, 150 m sur de tenchas'},
];

const defaultShoeList = [
  {id: 1, name: 'Mocacin', description: 'color negro', price: 16000, total: 3, storeId: 2},
  {id: 2, name: 'Chancletas', description: 'color azul', price: 6000, total: 2, storeId: 2},
  {id: 3, name: 'Mocacin', description: 'color rojo', price: 16000, total: 3, storeId: 1},
  {id: 4, name: 'Tacos', description: 'color verde', price: 45000, total: 1, storeId: 1},
];


class ShoeStoreListDashboard extends React.Component {
  
  componentDidMount(){
    defaultStoreList.map((store) => (
      this.props.addStore(store.name, store.address)
    ));
    defaultShoeList.map((shoe) => (
      this.props.addShoe(shoe.name, shoe.description, shoe.price, shoe.total, shoe.storeId)
    ));
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

  handleShowShoes = (shoeStoreId) => {
    this.setState({shoeStoreId: shoeStoreId});
  };

  createShoeStore = (shoeStore) => {
    const newStoreId = this.state.shoeStoreList.length + 1;
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
    this.setState({storeId: storeId});
  };

  createShoe = (shoe) => {
    const id = this.state.shoeList.length + 1;
    this.props.addShoe(id, shoe.name, shoe.description, shoe.price, shoe.total, this.props.storeId )
  };

  updateShoe = (attrs) => {
    this.props.updateShoe(attrs.id, attrs.name, attrs.description, attrs.price, attrs.total, attrs.storeId);
  };

  deleteShoe = (shoeId) => {
    this.props.removeShoe(shoeId);
  };

  render() {
    const currentShoeList = this.props.shoes.filter(s => s.storeId === this.props.storeId);
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
  updateStoreId: PropTypes.func
};

const mapStateToProps = (state) => ({
  shoeStores: state.shoeStoreList,
  shoes: state.shoeList,
  storeId: state.storeId
});

const mapDispatchToProps = (dispatch) => ({
  addShoe: (id, name, description, price, total, storeId) => { dispatch(addShoe(id, name, description, price, total, storeId)) },
  updateShoe: (id, name, description, price, total, storeId) => { dispatch(updateShoe(id, name, description, price, total, storeId)) },
  removeShoe: (id) => {dispatch(removeShoe(id))},
  addShoeStore: (id, name, address) => { dispatch(addStore(id, name, address)) },
  updateShoeStore: (id, name, address) => { dispatch(updateStore(id, name, address)) },
  removeShoeStore: (id) => { dispatch(updateStoreId) }
});


export default connect(mapStateToProps, mapDispatchToProps)(ShoeStoreListDashboard);
