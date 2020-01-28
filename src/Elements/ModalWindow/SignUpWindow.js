import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from "axios";
import classNames from 'classnames';

const modalStyles = theme => ({
  form: {
    position: 'relative',
    zIndex: '5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '370px',
    width: '500px',
    paddingTop: '50px',
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderWidth: 4,
    borderStyle: 'solid',
    borderImage: 'linear-gradient(135deg, #12BCB0, #FABE0E) 1',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  column: {},
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputLabel: {
    color: 'white !important',
    "&.focused": {
      color: 'white !important'
    },
  },

  TextField: {
    '& p': {
      color: 'white !important',
    },
    width: 320,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  notchedOutline: {
    borderWidth: 4,
    borderStyle: 'solid !important',
    borderImage: 'linear-gradient(135deg, #12BCB0, #FABE0E) 1 !important',
  },
  error: {
    color: 'red'
  },
  checked: {},
  href: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    }
  }

})

class SignUpWindow extends Component {
  state = {
    user: {
      username: "",
      email: "",
      password: ""
    },
    nameError: "",
  };

  checkRegistration = () => {
    console.log(this.state.user);

    axios.post('/api/users/register', this.state.user)
      .then((response) => {
          if (response.data.auth) {
            localStorage.setItem("token", response.data.token);
            this.props.setUsersData(response.data.user, response.data.auth);
            this.props.closeWindow(this.props.currentWindow)
          } else {
            this.setState({nameError: response.data.message});
          }
        }
      )
      .catch((error) => {
        console.log(error);
      });

  };

  changeCurrentWindow = () => {
    this.props.changeCurrentWindow("isLogInOpened")
  };

  onChangeEvent = (e) => {
    const id = e.target.id;
    const current = e.currentTarget.value;
    let obj = {...this.state.user};
    obj[id] = current;
    this.setState({user: obj});
  };


  render() {
    const {classes} = this.props;
    return (
      <form className={classes.form}>

        <Grid className={classes.column}>

          {this.state.nameError ?
            <Grid className={classNames(classes.row, classes.error)}>{this.state.nameError}</Grid>
            : null}

          <Grid className={classes.row}>
            <TextField
              // helperText={this.state.nameError}
              // onBlur={this.checkName}
              onChange={this.onChangeEvent}
              id="username"
              label="Display Name"
              className={classes.TextField}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                  focused: "focused",
                }
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}/>
          </Grid>

          <Grid className={classes.row}>
            <TextField
              type="email"
              onChange={this.onChangeEvent}
              id="email"
              label="Email"
              className={classes.TextField}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                  focused: "focused",
                }
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}/>
          </Grid>

          <Grid className={classes.row}>
            <TextField
              helperText={"Пароль повинен містити принаймні вісім символів, включаючи принаймні 1 букву та 1 цифру."}
              onChange={this.onChangeEvent}
              id="password"
              type="password"
              label="Password"
              className={classes.TextField}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                  focused: "focused",
                }
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline

                }
              }}/>
          </Grid>

          <Grid className={classes.row}>
            <div onClick={this.checkRegistration} className={classNames("simpleButton", classes.button)}>
              Sign up
            </div>
          </Grid>

          <Grid className={classes.row}>
            <a className={classes.href} onClick={() => this.changeCurrentWindow()} href="#"> Маєте вже обліковий
              запис?</a>
          </Grid>

        </Grid>
      </form>
    )
  }
}

SignUpWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  currentWindow: state.reducer.currentWindow,
});

const mapDispatchToProps = (dispatch) => ({
  closeWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle});
  },
  changeCurrentWindow: (toggle) => {
    dispatch({type: "CHANGE_WINDOW", toggle: toggle})
  },
  setUsersData: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalStyles)(SignUpWindow))
