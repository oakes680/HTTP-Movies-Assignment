import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
      this.handleEdit(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      // console.log(id)
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const handleEdit = e => {
      e.preventDefault();
      console.log('this is id', this.state.movie.id);
      this.props.history.push(`/update-movie/${this.state.movie.id}`);
    };

    const handleDelete = e => {
      axios
        .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
        .then(res => {
          console.log('delete', res)
          this.props.history.push('/')
        })
    };

    return (
      <>
        
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={handleEdit} className="md-button">
          Edit
        </button>
        <button onClick={handleDelete} className="md-button">
          delete
        </button>
      </div>
      </>
    );
  }
}
