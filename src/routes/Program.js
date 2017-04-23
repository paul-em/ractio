import React from 'react';
import TrackCard from '../components/TrackCard';

export default class Program extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        {
          artist: 'Gorillaz',
          song: 'Saturn Barz (feat. Popcaan)',
          time: new Date(),
        },
        {
          artist: 'Skero',
          song: 'Pistenkanone',
          time: new Date(new Date().getTime() - (1000 * 60 * 4)),
        },
      ],
    };
  }

  render() {
    return <div>
      {this.state.songs.map(item => <TrackCard key={item.time} {...item} />) }
    </div>;
  }
}
