import React from 'react';
import EditableShoeStore from './EditableShoeStore.js';

export default class EditableShoeStoreList extends React.Component {
  render() {
    const shoeStores = this.props.shoeStores.map((shoeStore) => (
      <EditableShoeStore
        key={shoeStore.id}
        id={shoeStore.id}
        name={shoeStore.name}
        address={shoeStore.address}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onSelectedStoreId={this.props.onSelectedStoreId}
      />
    ));
    return (
      <div id='shoeStores'>
        {shoeStores}
      </div>
    );
  }
}
