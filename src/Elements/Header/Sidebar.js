import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {

  activeButton = (event) => {
    this.setActivePage(event.target.id);
  };

  render() {
    return (
      <div className={this.props.isSidebarOpened ? "Sidebar" : "Sidebar-hidden"}>

        <div className="blockOfRoutes">
          <div className={this.props.isSidebarOpened ? "pullingBlocks" : null}>
            <Link onClick={this.activeButton} id="home"
                  className={this.props.activePage === this.props.pages[0] ?
                    "activateButton " : "simpleButton"} to="/"> Home </Link>
          </div>

          <div className={this.props.isSidebarOpened ? "pullingBlocks" : null}>
            <Link onClick={this.activeButton} id="collections"
                  className={this.props.activePage === this.props.pages[1] ?
                    "activateButton " : "simpleButton"} to="/collections"> Collections</Link>
          </div>

          <div className={this.props.isSidebarOpened ? "pullingBlocks" : null}>
            <Link onClick={this.activeButton} id="news"
                  className={this.props.activePage === this.props.pages[2] ?
                    "activateButton " : "simpleButton"} to="/news"> News</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActivePage: (id) => {
    dispatch({type: "SET_ACTIVE_PAGE", id: id})
  },
  openModalWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle})
  },
  logOut: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});

const mapStateToProps = (state) => ({
  isSidebarOpened: state.reducer.isSidebarOpened,
  activePage: state.reducer.activePage,
  pages: state.reducer.pages
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
