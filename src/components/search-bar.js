import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      placeHolder: 'Tapez votre film...',
      intervalBeforeRequest: 1000,
      lockRequest: false,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8 input-group">
          <input
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={this.searchMovies.bind(this)}>
              Go
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(() => {
        this.searchMovies();
      }, this.state.intervalBeforeRequest);
    }
    this.props.callback(this.state.searchText);
  }

  searchMovies() {
    this.props.callback(this.state.searchText);
    this.setState({ lockRequest: false });
  }
}

export default SearchBar;
