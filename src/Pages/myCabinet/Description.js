import {connect} from "react-redux";
import React, {useRef} from "react";
import axios from "axios";

function Description(props) {
  const select = useRef(null);
  const input = useRef(null);
  const textarea = useRef(null);

  const saveDescription = () => {
    let payload = {
      modelId: props.modelId,
      author: input.current.value,
      category: select.current.value,
      description: textarea.current.value
    };
    console.log(payload)

    axios.post("/api/models/update/model:" + props.modelId + "/information", payload).then((res) => {
      console.log(res);
    })
  };

  return <div className="modelsInformationBlock">
    <div>
      <p className="heading">Editing model's information</p>
    </div>

    <div className="rowSpaceAround">

      <div className="FlexStart">
        <p className="text">Categories</p>
        <select ref={select} id="category" className="select">
          <option selected disabled hidden>Choose here</option>
          {props.categories.map((category) => {
            return <option>{category}</option>
          })
          })
        </select>
      </div>

      <div className="FlexStart">
        <p className="text">Author</p>
        <input disabled ref={input} id="author" className="input" value={props.username}/>
      </div>
    </div>

    <div className="FlexStart">
      <p className="text">Description</p>
      <textarea ref={textarea} id="description" placeholder="Write some stuff here..."
                className="textArea"/>
    </div>

    {props.files.length > 0 ?
      <div className="simpleButton" onClick={saveDescription}>
        Save
      </div> : <p className="text">Firstly upload model, then save description</p>}

  </div>
}

const mapStateToProps = (state) => ({
  files: state.reducer.files,
  auth: state.reducer.auth,
  username: state.reducer.user.username,
  categories: state.reducer.categories,
  modelId: state.reducer.modelId
});

const mapDispatchToProps = (dispatch) => ({
  saveModelsInfo: (info) => {
    dispatch({type: "SAVE_MODELS_INFO", info: info})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
