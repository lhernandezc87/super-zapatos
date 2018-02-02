import React from 'react';
import PropTypes from 'prop-types';

export default class ShoeStore extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  handleStoreClick = (evt) => {
    this.props.onSelectedStoreId(this.props.id);
  }

  render() {
    return (
      <div className='ui centered card'>
        <div 
          className='content' 
          onClick={this.handleStoreClick}>
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

ShoeStore.propTypes = {
  onTrashClick: PropTypes.func.isRequired,
  onSelectedStoreId: PropTypes.func.isRequired
}
