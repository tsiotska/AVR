import {connect} from "react-redux";
import React, {useRef, useEffect, useState} from "react";
import axios from "axios";
import Select from 'react-select';
import {reactSelectStyles} from '../../Styles/components/reactSelect';

function Description(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, handleCategory] = useState([]);

  //const select = useRef(null);
  const input = useRef(null);
  const textarea = useRef(null);

  useEffect(() => {
    axios.get("/api/models/categories",
    ).then(res => {
      console.log(res);
      const result = res.data.map((category) => {
        return {label: category, value: category}
      });
      console.log(result)
      setCategories(result)
    }).catch((err) => console.log(err));
  }, []);


  const saveDescription = () => {
    console.log(selectedCategory);
    let payload = {
      modelId: props.modelId,
      author: input.current.value,
      category: selectedCategory.value,
      description: textarea.current.value
    };
    axios.post("/api/models/update/model:" + props.modelId + "/information",
      payload, {
        headers: {'Authorization': localStorage.getItem("token")},
      }).then((res) => {
      console.log(res);
    })
  };

  return <div className="modelsInformationBlock">
    <div>
      <p className="heading">Editing model's information</p>
    </div>

    <div className="rowSpaceAround">

      <div className="columnFlexStart">
        <p className="text">Categories</p>
        <Select
          styles={reactSelectStyles}
          options={categories}
          onChange={(selected) => handleCategory(selected)}
        />
      </div>

      <div className="columnFlexStart">
        <p className="text">Author</p>
        <input disabled ref={input} id="author" className="input" value={props.username}/>
      </div>
    </div>

    <div className="columnFlexStart">
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
