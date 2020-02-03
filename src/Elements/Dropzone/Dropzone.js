import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormData from 'form-data';
import {connect} from "react-redux";

class DropzoneComponent extends React.Component {

  onDrop = (acceptedFiles) => {
    const data = new FormData();
    for (let i = 0; i < acceptedFiles.length; i += 1) {
      data.append('file', acceptedFiles[i]);
    }
    data.append('modelId', Date.now());
    this.props.saveFiles(acceptedFiles, data);
  };

  sendFiles = () => {
    axios.post('/api/models/upload/model', this.props.filesFormData, {
      headers: {'Authorization': localStorage.getItem("token")},
    }).then((res) => {
      console.log(res);
      this.props.saveModelId(res.data.modelId)
    })
  };

  render() {
    return (
      <div className="dropzoneBlock">
        <div>
          <p className="text">Gltf uploader. Please adhere to gltf file structure</p>
        </div>

        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps}) => (
            <section className="container">
              <div {...getRootProps({className: 'dropzone'})} className="dropzone">
                <input {...getInputProps()} />
                <div className="centeredColumn">
                  <i className="fas fa-cloud-upload-alt fa-2x"/>
                  <p className="dropzoneLabel">Drag 'n' drop some files here, or click to select files</p>
                </div>
              </div>

              <aside>
                <h4>Files</h4>
                {this.props.files.map((file) => {
                  return <ul> {file.name}</ul>
                })}
              </aside>
            </section>
          )}
        </Dropzone>

        <div className={this.props.files.length > 0 ? "simpleButton" : "nonDisplayed"} onClick={() => {
          this.sendFiles()
        }}>Upload
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.reducer.files,
  filesFormData: state.reducer.filesFormData,
  token: state.reducer.token
});

const mapDispatchToProps = (dispatch) => ({
  saveFiles: (files, filesFormData) => {
    dispatch({type: "SAVE_FILES", files: files, filesFormData: filesFormData})
  },
  saveModelId: (id) => {
    dispatch({type: "SAVE_MODEL_ID", id: id})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneComponent);
