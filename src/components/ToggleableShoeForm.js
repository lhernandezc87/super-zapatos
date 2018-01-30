import React from 'react';
import ShoeForm from './ShoeForm.js';

export default class ToggleableShoeForm extends React.Component {

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
