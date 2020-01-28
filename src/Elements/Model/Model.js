import React from 'react';
import Scene from './SceneRenderer/Scene';
import LoadingPage from '../../Loading/PreLoader'
import {FormGroup, Label, Input, Button} from 'reactstrap';
import axios from "axios";

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelsNames: [],
      currentModel: "",
      readyToRender: false
    };
  }

  componentDidMount() {
    axios.get('/api/models/list').then((res) => {
      if (res.data) {
        this.setState({
          currentModel: res.data[0],
          modelsNames: res.data,
          readyToRender: true
        });
      }
    }).catch((err) => console.log(err))
  }

  toggle = (event) => {
    this.setState({currentModel: event.target.value});
    console.log(this.state.currentModel);
  };

  render() {
    return (
      <div className="modelWrapper">

        <FormGroup className="searchField">
          <div>
            <Label for="exampleSelect">Choose your model</Label>
            <select name="select" onChange={(e)=>this.toggle(e)}>
              {this.state.modelsNames.map((name, index) => {
                return <option  key={index}>{name}</option>
              })}
            </select>
          </div>
          <Input name="text" placeholder="Знайди свою модель!"/>
        </FormGroup>

        <div className="scene">
          {this.state.readyToRender ? <Scene link={'/api/models/gltf?root='+ this.state.currentModel}/> : <LoadingPage/>}
        </div>

      </div>
    )
  }
}

export default Model;
