import React from "react";
import {connect} from "react-redux";

class MobileHeader extends React.Component {

  openSidebar = () => {
    document.getElementById("hamburger").classList.toggle("is-active");
    this.props.openSidebar();
  };

  render() {
    return (
      <div className="nav-list">

        <button id="hamburger" onClick={this.openSidebar} className="hamburger hamburger--emphatic" type="button"
                aria-label="Menu" aria-controls="navigation" aria-expanded="true/false">
    <span className="hamburger-box">
      <span className="hamburger-inner"/>
    </span>
        </button>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.reducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  openSidebar: () => {
    dispatch({type: "OPEN_SIDEBAR"})
  },
  openModalWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle})
  },
  logOut: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader)
