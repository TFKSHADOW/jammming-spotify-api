import React from 'react';
import './Tracklist.css';
import {Track} from '../Track/Track';

export class Tracklist extends React.Component {
    render() {
      return (
        <div className="Tracklist">
          {/* <!-- You will add a map method that renders a set of Track components  --> */}
          {this.props.tracks.map((song) => {
            return (
              <Track
                key={song.id}
                track={song}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
              />
            );
          })}
        </div>
      );
    }
  }
  