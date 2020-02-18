import {connect} from "react-redux";
import React, {useEffect} from "react";
import axios from "axios";


function ModelsList(props) {
  useEffect(() => {
    console.log("props");
    console.log(props);

    if (props.models.length > 0) {
      props.models.forEach((model) => {
        axios.get("/api/collections/model/screen",
          {responseType: 'blob', params: {screenName: model.screenName}}
        ).then(res => {
          let image = document.getElementById(model.modelId);
          image.src = window.URL.createObjectURL(res.data);

        }).catch((err) => console.log(err));
      })
    }
  });

  console.log(props);
  return <div className="cardsWrapper">

    {props.models.length > 0 && props.models.map((model) => {
        return <div key={model.modelId} className="card">
          <div className="screenWrapper">
            <img alt={model.modelId}
               className="screen"  id={model.modelId}/>
            <div className="dandruff">
              <i className="fas fa-search"/>
            </div>
          </div>
          <div className="cardFooter">I am footer skeleton! Put here pretty data</div>
        </div>
      }
    )}
  </div>
}

const mapStateToProps = (state) => ({
  /*files: state.reducer.files,
  auth: state.reducer.auth,
  username: state.reducer.user.username,
  categories: state.reducer.categories,
  modelId: state.reducer.modelId*/
});

const mapDispatchToProps = (dispatch) => ({
  /* saveModelsInfo: (info) => {
     dispatch({type: "SAVE_MODELS_INFO", info: info})
   }*/
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelsList);
