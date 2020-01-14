import React, {Component} from 'react';
import {connect} from "react-redux";
import LoginWindow from './loginWindow'
import SignUpWindow from './SignUpWindow'
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const wrapperStyles = theme => ({
  [theme.breakpoints.between("sm", "xl")]: {},
  [theme.breakpoints.between("xs", "sm")]: {
    closeButton: {}
  },
//Removed to modalWindow.scss
});

class ModalWindow extends Component {

  moveModal = (e) => {
    if (window.innerWidth > 800) {
      const ball = document.getElementById("windowBlock");
      const Modal = ball.getBoundingClientRect();
      const coordX = e.pageX - (Modal.right - ball.clientWidth + ball.clientWidth / 2);
      const coordY = e.pageY - (Modal.bottom - ball.clientHeight + ball.clientHeight / 2);
      document.onmousemove = (e) => {
        this.moveAt(e, coordX, coordY);
      };
      ball.onmouseup = () => {
        document.onmousemove = null;
        ball.onmouseup = null;
      }
    }
  };

  moveAt = (e, coordX, coordY) => {
    const left = e.pageX - coordX;
    const top = e.pageY - coordY;
    this.props.changeCoord(left, top)
  };

  render() {
    const {classes} = this.props;
    return (

      this.props.modalIsOpen ? <div
        id={"windowBlock"} className="myModal"
        style={{
          left: this.props.left,
          top: this.props.top,
        }}>

          <div className="removeLine"
               onMouseDown={(e) => {
                 this.moveModal(e)
               }}>
            <div>
              <div className="closeButton"
                   onClick={() => {
                     this.props.closeWindow(this.props.currentWindow)
                   }}>

                <i className="fas fa-times  fa-2x"/>

              </div>
            </div>
          </div>
        {this.props.currentWindow === "isLogInOpened" ? <LoginWindow/> :
          this.props.currentWindow === "isSignUpOpened" ? <SignUpWindow/> : null}
      </div> : null
    )
  }
}

ModalWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modalIsOpen: state.reducer.isModalOpened,
  currentWindow: state.reducer.currentWindow,
  left: state.reducer.left,
  top: state.reducer.top
});

const mapDispatchToProps = (dispatch) => ({
  changeCoord: (left, top) => {
    dispatch({type: "SET_REMOVE", left: left, top: top})
  },
  closeWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle});
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(wrapperStyles)(ModalWindow))
