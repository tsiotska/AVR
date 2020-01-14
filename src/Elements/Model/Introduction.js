import React from 'react';
import Scene from './SceneRenderer/Scene';


class Introduction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modelWrapper">

        <div className="scene">
           <Scene link={'/api/models/gltf?root=Introduction'}/>
        </div>

      </div>
    )
  }
}

export default Introduction;
