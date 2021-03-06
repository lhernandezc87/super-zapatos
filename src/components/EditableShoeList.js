import React from 'react';
import EditableShoe from './EditableShoe.js';

export default class EditableShoeList extends React.Component {
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
        <div className='shoes'>
          <div className='shoeTableHeader'>
            <div className='shoeTableHeaderItem'>Producto</div>
            <div className='shoeTableHeaderItem'>Descripcion</div>
            <div className='shoeTableHeaderItem'>Precio</div>
            <div className='shoeTableHeaderItem'>cantidad</div>
          </div> 
          <div id='shoeStores'>
            {shoes}
          </div> 
        </div>  
      );
  }
}
