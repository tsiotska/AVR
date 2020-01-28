import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";
import AdminPanel from "../../Pages/myCabinet/AdminPanel";

class PrivateRoute extends React.Component {
  render() {
    return (
      <Route render={props => (
        this.props.auth ?
          <AdminPanel {...props} />
          : <Redirect to={"/"}/>
       // this.props.openLogin()
      )}/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.reducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  openLogin: (toggle) => {
    dispatch({type: "OPEN_LOGIN_DEFINITELY"})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
