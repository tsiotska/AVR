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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    width: '500px',
    zIndex: '5',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    border: '3px solid #FCDE00',
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
    "&.focused": {
      color: '#FCDE00 !important'
    },
  },

  TextField: {
    width: 320,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  notchedOutline: {
    borderColor: '#FCDE00  !important',
    borderWidth: 2,
  },
  error: {
    color: 'red'
  },
  checked: {},
  href: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }

})

class SignUpWindow extends Component {
  state = {
    user: {
      Name: "",
      Email: "",
      Password: ""
    },
    nameError: "",
  };

  checkRegistration = () => {
    axios.get('/api/users/register') //post this.state.user
      .then((response) => {
          if (response.data.auth) {
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
    console.log(this.state.user.Email)
  };


  render() {
    console.log("nameError: " + this.state.nameError)
    const {classes} = this.props;
    return (
      <form className={classes.form}>

        <Grid className={classes.column}>

          {this.state.nameError ?
            <Grid className={classNames(classes.row, classes.error)}>This account is already exist!</Grid>
            : null}

          <Grid className={classes.row}>
            <TextField
              // helperText={this.state.nameError}
              // onBlur={this.checkName}
              onChange={this.onChangeEvent}
              id="Name"
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
              type={"email"}
              onChange={this.onChangeEvent}
              id="Email"
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
              id="Password"
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
            <Button onClick={this.checkRegistration()} variant="contained" className={classes.button}>
              Sign up
            </Button>
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
