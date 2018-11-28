import React, { PureComponent } from 'react';

class WelcomePureForeceUpdate extends PureComponent { 
  render() {
    return <h1>{this.props.test}</h1>
  }
}

export default WelcomePureForeceUpdate;