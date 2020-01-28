import React from 'react';
import ViewModel from '../../Elements/Model/ModelsTemplate';
import Dropzone from '../../Elements/Dropzone/Dropzone';
import Description from './Description';
import {connect} from "react-redux";


class AdminPanel extends React.Component {

  render() {
    return (
      <div className="panelWrapper">
        {this.props.modelId ?
          <div className="columnSpaceAround">
            <p className="heading">Model's preview</p>
          <ViewModel model={this.props.modelId}/>
          </div>
          : <Dropzone/>}
        <Description/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.reducer.files,
  modelId: state.reducer.modelId
});

const mapDispatchToProps = (dispatch) => ({
  saveModelsInfo: (info) => {
    dispatch({type: "SAVE_MODELS_INFO", info: info})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
