import React, { Component } from 'react';
import { config } from './config.js';
import { connect } from 'react-redux';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      isDetails: false,
      current_movie: '',
      current_title: ''
    }
  }

  onChange = (e) => {
  if (e.target.value !== "") {
    document.getElementById('btn').style.background = '#8a3dff';
  } else {
    document.getElementById('btn').style.background = '#e0e0e0';
  }

  this.setState({
    ...this.state,
    query: e.target.value
  });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      current_title: this.state.query
    });

    this.props.fetch_api(this.state.query);
    document.querySelector('.search-form').reset();
  }

  details = (movie) => {
    this.setState({
      ...this.state,
      isDetails: true,
      current_movie: movie
    });
  }

  onClose = () => {
    this.setState({
      ...this.state,
      isDetails: false,
      current_movie: ''
    });
  }

  render() {

    return (

       (this.state.isDetails) ? (
        <div className="current-wrapper">
          <button className="btn-close" onClick={this.onClose}>Close</button>
        <div className="current-pic">
      {  (this.state.current_movie.backdrop_path !== null) ?  <img src={`http://image.tmdb.org/t/p/w500/${this.state.current_movie.backdrop_path}`} />
      : (this.state.current_movie.poster_path !== null) ? <img src={`http://image.tmdb.org/t/p/w500/${this.state.current_movie.poster_path}`} /> : <div className="no-image">No image provided</div>}
        </div>
        <div className="results-data">
          <h1>{this.state.current_movie.title}</h1>
          <p className="overview">{this.state.current_movie.overview}</p>
          <p className="vote vote-current"><span className="actualVote">{this.state.current_movie.vote_average}</span><span className="toTen"><span className="separator">/</span>10</span></p>
          </div>
        </div>
      )

      : (
        <div className="search-wrapper">
          <form className="search-form" onSubmit={this.onSubmit}>
            <input placeholder="Search movies or tv shows..." onChange={this.onChange.bind(this)} name="query" />
            <button id="btn" type="submit">Search</button>
          </form>

          {(this.props.queries.results) && (this.props.queries.results.length === 0) && <div className="results-name">There are no results for <span className="actual-result-title">{this.state.current_title}</span></div>}

          {(this.props.queries.results) && (this.props.queries.results.length > 0) ? <div className="results-name">Results for <span className="actual-result-title">{this.state.current_title}</span></div> : <div className="results-name"></div>}

          <div className="results-wrapper">

          {(this.props.queries.results) && this.props.queries.results.map(result => (
                <div className="results" key={result.id}>

                <div className="results-pic">
              {  (result.backdrop_path !== null) ?  <img onClick={() => this.details(result)} src={`http://image.tmdb.org/t/p/w500/${result.backdrop_path}`} />
              : (result.poster_path !== null) ? <img onClick={() => this.details(result)} src={`http://image.tmdb.org/t/p/w500/${result.poster_path}`} /> : <div className="no-image">No image provided</div>}

                </div>

                <div className="results-data">
                <span>
                  <h4 onClick={() => this.details(result)}>{result.title}</h4>
                  <p className="vote"><span className="actualVote">{result.vote_average}</span><span className="toTen"><span className="separator">/</span>10</span></p>
                  <button className="btn-details" onClick={() => this.details(result)}>See details</button>
                  </span>
                </div>

                </div>
              ))}
          </div>

        </div>
      )
   );
 }
}


const mapDispatchToProps = (dispatch) => {
  return  {

    fetch_api: (q) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.api_key}&query=${q}`)

        .then( response => response.json())
        .then( json => {
          dispatch({type: "FETCH_API", payload: json})
        })
        .catch( (err) => {
          dispatch({type: "FETCH_ERROR", payload: err})
        })
      }
    }
  }

const mapStateToProps = (state, ownProps) => {
  return {
    "queries": state.queries
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
