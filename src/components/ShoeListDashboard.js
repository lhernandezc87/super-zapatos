import React from 'react';
import EditableShoeList from './EditableShoeList.js';
import ToggleableShoeForm from './ToggleableShoeForm.js';


export default class ShoeListDashboard extends React.Component {

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