import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import PreLoader from "../../Elements/Model/SceneRenderer/Scene";

class UserInfo extends React.Component {
  state = {
    avatar: null,
    file: null,
    loading: false
  };

  componentDidMount() {
    axios.get("/api/users/avatar", {
      responseType: 'blob',
      headers: {'Authorization': this.props.token}
    }).then(image => {
      this.setState({avatar: window.URL.createObjectURL(image.data)})
    }).catch((err) => console.log(err))
  };

  putImage = async (event) => {
    console.log(event.target.files[0])
    await this.setState({file: event.target.files[0]});
    this.sendPhoto();
  };

  sendPhoto = () => {
    const fd = new FormData();
    fd.append("image", this.state.file, this.state.file.name);
    this.setState({loading: true});
    axios.post("/api/users/updatePhoto", fd, {responseType: 'blob', headers: {'Authorization': this.props.token}})
      .then((image) => {
        console.log("New avatar incoming!!! ")
        console.log(image)

        this.setState({
          avatar: window.URL.createObjectURL(image.data),
          loading: false
        })
      }).catch((err) => console.log(err))
  };

  render() {
    return (
      <div className="userInfoPageWrapper">
        <div className="columnSpaceAround">
          <div className="columnFlexStart">
            <p className="heading">Your profile information</p>
          </div>

          <div className="rowSpaceAround">
            <div className="imgContainer">
              {this.state.loading ?
                <PreLoader/>
                : null
              }
              <img className='Avatar' src={this.state.avatar} alt="Avatar"/>
              <input ref={fileInput => this.fileInput = fileInput} type="file" accept=".jpg, .jpeg, .png"
                     onChange={this.putImage}
                     className="fileInput"/>
              <button className="putImageBtn" onClick={() => this.fileInput.click()}>Change avatar</button>
            </div>

            <div className="columnFlexStart">
              <p className="text">Username</p>
              <input disabled className="input" value={this.props.username}/>
            </div>
            <div className="columnFlexStart">
              <p className="text">Email</p>
              <input disabled className="input" value={this.props.email}/>
            </div>
            <div className="columnFlexStart">
              <p className="text">Phone number</p>
              <input disabled className="input" value={this.props.phone}/>
            </div>
          </div>
          <div className="rowSpaceAround">
            <div className="columnFlexStart">
              <p className="text">Your quotes</p>
              <textarea disabled className="textArea" value={this.props.quotes}/>
            </div>
            <div className="userInfoBtns">
              <div className="simpleButton">
                Save
              </div>
              <div className="simpleButton">
                Statistic
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.reducer.token,
  username: state.reducer.user.username,
  email: state.reducer.user.email,
  phone: state.reducer.user.phone,
  quotes: state.reducer.user.quotes
});

const mapDispatchToProps = (dispatch) => ({
  openSidebar: () => {
    dispatch({type: "OPEN_SIDEBAR"})
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
