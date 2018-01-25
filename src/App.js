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

  render() {
    return (     
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


class ShoeList extends React.Component {
  state = {
    storeId: this.props.storeId,
    shoeList: defaultShoeList, 
  }

  handleCreateFormSubmit = (shoe) => {
    this.createShoe(shoe);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateShoe(attrs);
  };

  handleTrashClick = (shoeId) => {
    this.deleteShoe(shoeId);
  };

  createShoe = (shoe) => {
    const newShoe = {};
    newShoe.name = shoeStore.name;
    newShoe.address = shoeStore.address;
    newShoe.id = this.state.shoeStoreList.length + 1;
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
            storeId: attrs.storeId,
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
    return (     
      <div className='shoeContainer'>
        <EditableShoeList
          shoes={this.state.shoeList}
          onFormSubmit={this.handleEditFormSubmit}
          onTrashClick={this.handleTrashClick}
        />
        <ToggleableShoeForm
          onFormSubmit={this.handleCreateFormSubmit}
        />
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
  {id: 1, name: 'chancletas', description: 'color azul', price: 6000, total: 2, storeId: 2},
  {id: 1, name: 'mocacin', description: 'color rojo', price: 16000, total: 3, storeId: 1},
  {id: 1, name: 'tacos', description: 'color verde', price: 45000, total: 1, storeId: 1},
];


export default App;
