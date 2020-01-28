import React from 'react';
import Scene from './SceneRenderer/Scene';

function ModelsTemplate(props) {

  return (
    <div className="modelWrapper">
        <Scene link={'/api/models/gltf?root=' + props.model}/>
    </div>
  )
}

export default ModelsTemplate;
