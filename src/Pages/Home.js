import React from 'react';
import ModelsTemplate from '../Elements/Model/ModelsTemplate';



class Home extends React.Component {
  render() {
    return (
      <div className="homeWrapper">
        <div className="modelIntroductionWrapper">

          <div className="text-label">Using our services you can easily provide any 3D object to your site only in one
            click
          </div>

          <div className="introBlock">
            <ModelsTemplate model={"Introduction"}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
