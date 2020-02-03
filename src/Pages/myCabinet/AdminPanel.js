import React from 'react';
import ViewModel from '../../Elements/Model/ModelsTemplate';
import Dropzone from '../../Elements/Dropzone/Dropzone';
import Description from './Description';
import {connect} from "react-redux";
import FormData from 'form-data';
import axios from "axios";


class AdminPanel extends React.Component {

  makeScreen = () => {
    console.log("making screen...");
    let canvas = document.getElementById('three');
    const modelId = this.props.modelId;

    canvas.toBlob(async (blob) => {
      const data = new FormData();
      await data.append('modelId', modelId);
      await data.append('file', blob);
      /*
            for (let [key, value] of data.entries()) {
              console.log(key, value);
            } */ //if you wanna look into form data
      axios.post("/api/models/update/model:" + modelId + "/screen", data,
        {
          headers: {'Authorization': localStorage.getItem("token")},
        }).then((res) => {
        console.log(res)
      }).catch((err) => console.log(err))
    });
  };

  render() {
    return (
      <div className="panelWrapper">
        {this.props.modelId ?
          <div className="columnSpaceAround">
          <div className="modelHolder">
            <p className="heading absoluteText">Model's preview</p>
            <ViewModel className="" model={this.props.modelId}/>
            <div className='simpleButton screenBtn' onClick={this.makeScreen}>Screen capture!</div>
          </div>
            <div className="text">
              You can rotate model as you want, then make a screenshot which will represent your model in collections
            </div>
          </div>
          : <Dropzone/>}
        <div className="descriptionHolder">
          <Description/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modelId: state.reducer.modelId,
});

const mapDispatchToProps = (dispatch) => ({
  saveModelsInfo: (info) => {
    dispatch({type: "SAVE_MODELS_INFO", info: info})
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
