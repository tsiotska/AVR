import React from 'react';
import ViewModel from '../Elements/Model/Model';
import Dropzone from '../Elements/Dropzone/Dropzone';

class AdminPanel extends React.Component {
  render() {
    return (
      <div className="panelWrapper">
        You are in your own cabinet
        <Dropzone/>
      </div>
    );
  }
}

export default AdminPanel;
