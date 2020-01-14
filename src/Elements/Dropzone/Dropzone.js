import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormData from 'form-data';

export default class Accept extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    const data = new FormData();
    for (let i = 0; i < acceptedFiles.length; i += 1) {
      data.append('file', acceptedFiles[i]);
    }
    data.append('name', Date.now() / 1000);
    this.setState({files: data})
  };

  sendFiles = () => {
    const files = this.state.files;

    axios.post('/api/models/upload/model', files).then((res) => {
      console.log(res);
    })
  };

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps}) => (
            <section className="container">
              <div {...getRootProps({className: 'dropzone'})} className="dropzone">
                <input {...getInputProps()} />
                <div className="centeredColumn">
                  <i className="fas fa-cloud-upload-alt fa-2x"/>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </div>
              <aside>
                <h4>Files</h4>
                <ul>{}</ul>
              </aside>
            </section>
          )}
        </Dropzone>
        <button onClick={() => {
          this.sendFiles()
        }}>Отправить
        </button>
      </div>
    );
  }
}


