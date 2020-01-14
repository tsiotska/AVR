import React from 'react';
import ViewModel from '../Elements/Model/Model';
import Dropzone from '../Elements/Dropzone/Dropzone';

class AdminPanel extends React.Component {
  render() {
    return (
      <div className="panelWrapper">
        You are in your own cabinet

        <div> <button>Upload Model</button></div>

        <div className="Wrapper">
          <Dropzone/>

          <div className="modelsInformationBlock">
<div>
  <p>Select category</p>
</div>
          </div>

        </div>

      </div>
    );
  }
}

export default AdminPanel;
