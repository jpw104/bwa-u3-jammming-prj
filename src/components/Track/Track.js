import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction(e) {
    if (e.isRemoval) {
      return (
        <a className="Track-action" href="" onClick={this.addTrack}>+</a>
      );
    }
    else {
      return (
        <a className="Track-action" href="" onClick={this.removeTrack}>-</a>
      );
    }
  }

  addTrack(){

  }

  removeTrack(){

  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}track name will go here </h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action"> + or - will go here </a>
      </div>
    );
  }
}

export default Track;
