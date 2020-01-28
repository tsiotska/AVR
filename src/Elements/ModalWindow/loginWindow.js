import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import classNames from 'classnames';


const modalStyles = theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '350px',
    width: '500px',
    zIndex: '5',
    position: 'relative',
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
    width: 320,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  notchedOutline: {
    borderWidth: 4,
    borderStyle: 'solid !important',
    borderImage: 'linear-gradient(135deg, #12BCB0, #FABE0E) 1 !important',
  },
  infoText: {
    color: '#c7c7c7',
    paddingLeft: 30,
    paddingRight: 30
  },
  error: {
    color: 'red'
  },
  href: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    }
  }
});

class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
  }

  checkAuth = () => {
    let payload = this.state.user;
    axios.post('/api/users/login', payload)  //Замінити get на post та URL вказати вірний, другим параметром передати об'єкт user
      .then((response) => {
          console.log(response);

          if (response.data.auth) {
            localStorage.setItem("token", response.data.token);
            this.props.setUsersData(response.data.user, response.data.auth, response.data.token);
            this.props.closeWindow(this.props.currentWindow);
          } else {
            this
              .setState({errorMessage: response.data.message});
          }
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  changeCurrentWindow = () => {
    this.props.changeCurrentWindow("isSignUpOpened")
  };

  onChangeEvent = (e) => {
    const id = e.target.id;
    const current = e.currentTarget.value;
    let obj = {...this.state.user};
    obj[id] = current;
    this.setState({user: obj});
    console.log(this.state.user.username)
  };

  render() {
    const {classes} = this.props;
    return (
      <form className={classes.form}>

        <Grid className={classes.column}>

          {this.state.errorMessage ?
            <Grid className={classNames(classes.row, classes.error)}>{this.state.errorMessage}</Grid> : null}

          <Grid className={classes.row}>
            <TextField
              error={!!this.state.errorMessage}
              onChange={this.onChangeEvent}
              type="email"
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
              error={!!this.state.errorMessage}
              onChange={this.onChangeEvent}
              type="password"
              id="password"
              label="password"
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
            <a className={classes.href} href="#"> Forgot password? </a>
          </Grid>
          <Grid className={classes.row}>
            <div onClick={this.checkAuth} className={classNames("simpleButton", classes.button)}>
              Sign in
            </div>
          </Grid>

          <Grid className={classes.row}>
            <a className={classes.href} href="#" onClick={() => this.changeCurrentWindow()}> You have not registered
              yet?</a>
          </Grid>

        </Grid>
      </form>
    )
  }
}

LoginWindow.propTypes = {
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
  setUsersData: (data, auth,token) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth, token:token})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalStyles)(LoginWindow))
