import React, { PureComponent } from 'react';

class WelcomePure extends PureComponent {  
  render() {
    const { onClick, text } = this.props;

    return <h1 onClick={onClick}>{text}</h1>
  }
}

export default WelcomePure;