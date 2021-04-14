import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';

const API_KEY = 'api_key=25885e72395d5c928b3ef5707902daff';
const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL =
  'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(response => {
      this.setState(
        {
          currentMovie: response.data.results[0],
          movieList: response.data.results.slice(1, 6),
        },
        () => {
          this.applyVideoToCurrentMovie();
        }
      );
    });
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(response => {
        const youtubeKey = response.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({ currentMovie: newCurrentMovieState });
      });
  }

  setRecommendations() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }/recommendations?${API_KEY}&language=fr&include_adult=false`
      )
      .then(response => {
        this.setState({
          movieList: response.data.results.slice(0, 5),
        });
      });
  }

  changeMovie(movie) {
    this.setState({ currentMovie: movie }, () => {
      this.applyVideoToCurrentMovie();
      this.setRecommendations();
    });
  }

  searchMovie(searchText) {
    if (searchText) {
      axios
        .get(
          `${API_END_POINT}search/movie?query=${searchText}&${API_KEY}&language=fr&include_adult=false`
        )
        .then(response => {
          if (response.data && response.data.results[0])
            if (response.data.results[0].id !== this.state.currentMovie.id)
              this.setState(
                {
                  currentMovie: response.data.results[0],
                },
                () => {
                  this.applyVideoToCurrentMovie();
                  this.setRecommendations();
                }
              );
        });
    }
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList movieList={this.state.movieList} callback={this.changeMovie.bind(this)} />
        );
      }
    };

    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.searchMovie.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
