import React from 'react';
import PropTypes from 'prop-types';
import ShoeStoreForm from './ShoeStoreForm.js';
import ShoeStore from './ShoeStore.js';


export default class EditableShoeStore extends React.Component {
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
          onSelectedStoreId={this.props.onSelectedStoreId}
        />
      );
    }
  }
}

EditableShoeStore.propTypes ={
  onFormSubmit: PropTypes.func.isRequired
}
