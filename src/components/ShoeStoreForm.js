import React from 'react';
import PropTypes from 'prop-types';

export default class ShoeStoreForm extends React.Component {
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

ShoeStoreForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
}
