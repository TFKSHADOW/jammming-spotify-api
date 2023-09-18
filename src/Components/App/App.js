import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Example Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id
    );
    if (!foundTrack) {
      this.setState((prevState) => ({
        playlistTracks: [...prevState.playlistTracks, track],
      }));
    }
  }

  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    this.setState({ playlistTracks: updatedPlaylist });
  }

  
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    this.setState({ loading: true }); // Set loading state to true while saving
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
        loading: false, // Set loading state to false when saving is done
      });
    });
  }


  search(term) {
    Spotify.search(term).then((result) => {
      // Filter out tracks that are already in the playlist
      const newResults = result.filter(
        (track) =>
          !this.state.playlistTracks.some(
            (playlistTrack) => playlistTrack.id === track.id
          )
      );
      this.setState({ searchResults: newResults });
    });
  }



  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />

            {/* <!-- Add a Playlist component --> */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
          {this.state.loading && <p>Loading...</p>}
        </div>
      </div>
    );
  }
}

export default App;
