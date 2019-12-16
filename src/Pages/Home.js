import React from 'react';
import ViewModel from '../Elements/Model/Model';

class Home extends React.Component {
  render() {
    return (
      <div className="homeWrapper">
        <div className="modelIntroductionBlock">
          <div className="text-label">Using our services you can easily provide any 3D object to your site only in one click </div>
          <div><ViewModel/></div>
        </div>
      </div>
    );
  }
}

export default Home;
