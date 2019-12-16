import React from 'react';

class LoadingPage extends React.Component {

  render() {
    return (
      <div className="animation">
        <div className="bubblingG">
          <span id="bubblingG_1"/>
          <span id="bubblingG_2"/>
          <span id="bubblingG_3"/>
        </div>
      </div>
    )
  }
}

export default LoadingPage;
