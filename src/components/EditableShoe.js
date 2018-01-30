import React from 'react';
import ShoeForm from './ShoeForm.js';
import Shoe from './Shoe.js';

export default class EditableShoe extends React.Component {
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
