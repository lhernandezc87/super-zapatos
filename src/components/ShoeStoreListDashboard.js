import React from 'react';
import EditableShoeStoreList from './EditableShoeStoreList.js'; 
import ToggleableShoeStoreForm from './ToggleableShoeStoreForm.js';
import ShoeListDashboard from './ShoeListDashboard.js';


export default class ShoeStoreListDashboard extends React.Component {
  state = {
    shoeStoreList: defaultStoreList,
    shoeList: defaultShoeList,
    storeId: 1,
  };

  //cargar tiendas
  //componentWillUnmount
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
    const newStore = {};
    newStore.name = shoeStore.name;
    newStore.address = shoeStore.address;
    newStore.id = this.state.shoeStoreList.length + 1;
    const newShoeStoreList = [...this.state.shoeStoreList, newStore];
    this.setState({shoeStoreList: newShoeStoreList});
  };

  updateShoeStore = (attrs) => {
    this.setState({
      shoeStoreList: this.state.shoeStoreList.map((shoeStore) => {
        if (shoeStore.id === attrs.id) {
          return Object.assign({}, shoeStore, {
            name: attrs.name,
            address: attrs.address,
          });
        } else {
          return shoeStore;
        }
      }),
    });
  };

  deleteShoeStore = (shoeStoreId) => {
    this.setState({
      shoeStoreList: this.state.shoeStoreList.filter(t => t.id !== shoeStoreId),
    });

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
  }

  createShoe = (shoe) => {
    const newShoe = {};
    newShoe.name = shoe.name;
    newShoe.description = shoe.description;
    newShoe.price = shoe.price;
    newShoe.total = shoe.total;
    newShoe.storeId = this.state.storeId;
    newShoe.id = this.state.shoeList.length + 1;
    const newShoeList = [...this.state.shoeList, newShoe];
    this.setState({shoeList: newShoeList});
  };

  updateShoe = (attrs) => {
    this.setState({
      shoeList: this.state.shoeList.map((shoe) => {
        if (shoe.id === attrs.id) {
          return Object.assign({}, shoe, {
            name: attrs.name,
            description: attrs.description,
            price: attrs.price,
            total: attrs.total,
            storeId: this.state.storeId,
          });
        } else {
          return shoe;
        }
      }),
    });
  };

  deleteShoe = (shoeId) => {
    this.setState({
      shoeList: this.state.shoeList.filter(t => t.id !== shoeId),
    });

  };

  render() {
    const currentShoeList = this.state.shoeList.filter(s => s.storeId === this.state.storeId);
    return (
      <div className="appContainer">     
        <div className='storesContainer'>
          <EditableShoeStoreList
            shoeStores={this.state.shoeStoreList}
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
