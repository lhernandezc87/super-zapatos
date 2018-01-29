import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <ShoeStoreListDashboard/>
      </div>
    );
  }
}

class ShoeStoreListDashboard extends React.Component {
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

class ToggleableShoeStoreForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (shoeStore) => {
    this.props.onFormSubmit(shoeStore);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <ShoeStoreForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class EditableShoeStoreList extends React.Component {
  render() {
    const shoeStores = this.props.shoeStores.map((shoeStore) => (
      <EditableShoeStore
        key={shoeStore.id}
        id={shoeStore.id}
        name={shoeStore.name}
        address={shoeStore.address}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return (
      <div id='shoeStores'>
        {shoeStores}
      </div>
    );
  }
}

class EditableShoeStore extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (shoeStore) => {
    this.props.onFormSubmit(shoeStore);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <ShoeStoreForm
          id={this.props.id}
          name={this.props.name}
          address={this.props.address}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <ShoeStore
          id={this.props.id}
          name={this.props.name}
          address={this.props.address}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

class ShoeStore extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.name}
          </div>
          <div className='meta'>
            {this.props.address}
          </div>
          <div className='extra content'>
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClick}
            >
              <i className='trash icon' />
            </span>
          </div>
        </div>
      </div>
    );
  }
}


class ShoeStoreForm extends React.Component {
  state = {
    fields: {
      name:this.props.name || '',
      address: this.props.address || '',
    }
  };

  onChangeText = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields: fields});
  };

  handleSubmit = () => {
    console.log('this.props.id es' + this.props.id);
    this.props.onFormSubmit({
      id: this.props.id,
      name: this.state.fields.name,
      address: this.state.fields.address,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Add Store';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Name</label>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={this.state.fields.name}
                onChange={this.onChangeText}
              />
            </div>
            <div className='field'>
              <label>Address</label>
              <input
                type='text'
                placeholder='Address'
                name='address'
                value={this.state.fields.address}
                onChange={this.onChangeText}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class ShoeListDashboard extends React.Component {

  render() {
    return (     
      <div className='shoeContainer'>
        <EditableShoeList
          shoes={this.props.shoeList}
          onFormSubmitShoe={this.props.onFormSubmitShoe}
          onTrashClickShoe={this.props.onTrashClickShoe}
        />
        <ToggleableShoeForm
          onFormSubmitShoe={this.props.CreateFormSubmitShoe}
        />
      </div>     
    );
  }

}

class ToggleableShoeForm extends React.Component {

  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormCloseShoe = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmitShoe = (shoe) => {
    this.props.onFormSubmitShoe(shoe);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <ShoeForm
          onFormSubmitShoe={this.handleFormSubmitShoe}
          onFormCloseShoe={this.handleFormCloseShoe}
        />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class EditableShoeList extends React.Component {
  render() {
    const shoes = this.props.shoes.map((shoe) => (
      <EditableShoe
        key={shoe.id}
        id={shoe.id}
        name={shoe.name}
        description={shoe.description}
        price={shoe.price}
        total={shoe.total}
        storeId={shoe.storeId}
        onFormSubmitShoe={this.props.onFormSubmitShoe}
        onTrashClickShoe={this.props.onTrashClickShoe}
      />
    ));
    return (
      <div id='shoes'>
        {shoes}
      </div>
    );
  }
}


class EditableShoe extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClickShoe = () => {
    this.openForm();
  };

  handleFormCloseShoe = () => {
    this.closeForm();
  };

  handleSubmitShoe = (shoe) => {
    this.props.onFormSubmitShoe(shoe);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <ShoeForm
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          price={this.props.price}
          total={this.props.total}
          storeId={this.props.storeId}
          onFormSubmitShoe={this.handleSubmitShoe}
          onFormCloseShoe={this.handleFormCloseShoe}
        />
      );
    } else {
      return (
        <Shoe
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          price={this.props.price}
          total={this.props.total}
          storeId={this.props.storeId}
          onEditClickShoe={this.handleEditClickShoe}
          onTrashClickShoe={this.props.onTrashClickShoe}
        />
      );
    }
  }
}

class Shoe extends React.Component {


  handleTrashClickShoe = () => {
    this.props.onTrashClickShoe(this.props.id);
  };

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.name}
          </div>
          <div className='meta'>
            {this.props.description}
          </div>
          <div className='meta'>
            {this.props.price}
          </div>
          <div className='meta'>
            {this.props.total}
          </div>
          <div className='extra content'>
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClickShoe}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClickShoe}
            >
              <i className='trash icon' />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class ShoeForm extends React.Component {
  
  state = {
    fields: {
      name:this.props.name || '',
      description: this.props.description || '',
      price: this.props.price || '',
      total: this.props.total || '',
    }
  };

  onChangeText = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields: fields});
  };

  handleSubmitShoe = () => {
    this.props.onFormSubmitShoe({
      id: this.props.id,
      name: this.state.fields.name,
      description: this.state.fields.description,
      price: this.state.fields.price,
      total: this.state.fields.total,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Add shoe';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Name</label>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={this.state.fields.name}
                onChange={this.onChangeText}
              />
            </div>
            <div className='field'>
              <label>Description</label>
              <input
                type='text'
                placeholder='Description'
                name='description'
                value={this.state.fields.description}
                onChange={this.onChangeText}
              />
            </div>
             <div className='field'>
              <label>Price</label>
              <input
                type='text'
                placeholder='Price'
                name='price'
                value={this.state.fields.price}
                onChange={this.onChangeText}
              />
            </div>
             <div className='field'>
              <label>Total</label>
              <input
                type='text'
                placeholder='Total'
                name='total'
                value={this.state.fields.total}
                onChange={this.onChangeText}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmitShoe}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormCloseShoe}
              >
                Cancel
              </button>
            </div>
          </div>
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
  {id: 1, name: 'mocacin', description: 'color negro', price: 16000, total: 3, storeId: 2},
  {id: 2, name: 'chancletas', description: 'color azul', price: 6000, total: 2, storeId: 2},
  {id: 3, name: 'mocacin', description: 'color rojo', price: 16000, total: 3, storeId: 1},
  {id: 4, name: 'tacos', description: 'color verde', price: 45000, total: 1, storeId: 1},
];

export default App;
