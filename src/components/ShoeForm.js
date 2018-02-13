import React from 'react';
import PropTypes from 'prop-types';

export default class ShoeForm extends React.Component {
  
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
                type='number'
                placeholder='Price'
                name='price'
                value={this.state.fields.price}
                onChange={this.onChangeText}
              />
            </div>
             <div className='field'>
              <label>Total</label>
              <input
                type='number'
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

ShoeForm.propTypes = {
  onFormSubmitShoe: PropTypes.func.isRequired,
  price: PropTypes.number
}
