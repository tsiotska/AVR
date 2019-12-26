import React from 'react';
import {connect} from "react-redux";

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (<div>
      Collections!!!
    </div>)
  }
}

  const mapStateToProps = (state) => ({
 /* isModalOpened: state.reducer.isModalOpened,
  auth: state.reducer.auth*/
});

  const mapDispatchToProps = (dispatch) => ({
  /*setUsersData: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }*/
});

  export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
