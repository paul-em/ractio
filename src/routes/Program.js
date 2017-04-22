import React from 'react';

export default class Program extends React.Component {
  render() {
    return <div>
      <h1>{this.constructor.name}</h1>
    </div>;
  }
}
