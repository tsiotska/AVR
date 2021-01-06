import React from 'react';
import {connect} from "react-redux";
import Select from 'react-select';
import axios from "axios";
import {reactSelectStyles} from '../../Styles/components/reactSelect';
import ModelsList from './modelsList';

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [{value: "category", label: "Categories"}, {value: "author", label: "Authors"}],
      queries: [],
      selectedType: {value: "category", label: "Categories"},
      selectedQueries: [],
      models: []
    }
  }

  async componentDidMount() {
    try {
      await this.extractDataForSelect();
      this.searchModels();
    } catch (e) {
      console.error(e);
    }
  }

  extractDataForSelect = () => {
    return axios.get("/api/collections/extract",
      {params: {projection: this.state.selectedType.value}}
    ).then(res => {
      console.log("Your source: ");
      console.log(res);
      this.setState({
        queries: res.data.map((query) => {
          return {value: query[Object.keys(query)[0]], label: query[Object.keys(query)[0]]}
        })
      })
    }).catch((err) => console.log(err))
  };

  searchModels = () => {
    const payload = JSON.stringify(this.state.selectedQueries.map((item) => {
        return item.value
      }
    ));
    console.log(payload);

    axios.get("/api/collections", {
        params: {
          type: this.state.selectedType.value,
          value: payload,
          projection: ["_id", "modelId", "author", "description"]
        }
      }
    ).then(res => {
      console.log("Models: ");
      console.log(res);
      this.setState({models: res.data})
    }).catch((err) => console.log(err))
  };

  render() {
    return (<div className="collectionsPage">

      <div className="rowSpaceAround">

        <div className="centeredRow">
          <div className="centeredRow">
            <p className="label">Search by</p>
          </div>

          <div className="centeredRow">
            <Select
              value={this.state.selectedType}
              onChange={async (selected) => {
                await this.setState({selectedType: selected});
                this.extractDataForSelect(selected);
              }}
              options={this.state.types}
              styles={reactSelectStyles}
            />

          </div>
        </div>

        <div className="centeredRow">
          <div className="centeredRow">
            <p className="label">Parameter</p>
          </div>

          <div className="centeredRow">
            <Select
              value={this.state.selectedQueries}
              closeMenuOnSelect={false}
              isMulti
              isClearable
              isSearchable
              onChange={(selected) => {
                this.setState({
                  //  const selectedQueries = {...state.selectedQueries, selected};
                  selectedQueries: selected
                })
              }}
              options={this.state.queries}
              styles={reactSelectStyles}
            />

          </div>
        </div>

        <div className="centeredRow">
          <div className="simpleButton" onClick={this.searchModels}>Search</div>
        </div>
      </div>

      <ModelsList models={this.state.models}/>

    </div>)
  }
}

const mapStateToProps = (state) => ({
//  token: state.reducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  /*setUsersData: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }*/
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
