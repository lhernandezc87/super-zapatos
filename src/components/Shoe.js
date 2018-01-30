import React from 'react';

export default class Shoe extends React.Component {

  handleTrashClickShoe = () => {
    this.props.onTrashClickShoe(this.props.id);
  };

  render() {
    return (
      <div className='shoeContainer'>
        <div className='shoeContainerContent'>
          <div className='shoeContainerContentHeader'>
            {this.props.name}
          </div>
          <div className='shoeContainerContentbody'>
            {this.props.description}
          </div>
          <div className='shoeContainerContentbody'>
            {this.props.price}
          </div>
          <div className='shoeContainerContentbody'>
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