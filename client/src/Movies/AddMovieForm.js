import React, {useState} from 'react'
import axios from 'axios'

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};


const AddMovieForm = (props) => {
  const [newMovie, setNewMovie] = useState(initialMovie);

  const changeHandler = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
  }



  const starsHandler = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value.split(',')
    })
  }

 const handleSubmit = (e) => {
   e.preventDefault();
   axios
     .post(`http://localhost:5000/api/movies`, newMovie)
     .then(res => {
       console.log('thisisform', res.data);
       props.history.push("/")
     })
     .catch(err => console.log(err)); 
 } 



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"

        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder='metascore'
        />
        <input
          type="text"
          name="stars"
          onChange={starsHandler}
          placeholder="stars"
        />
        <button type='submit'> add a movie </button>
      </form>
    </div>
  )
}

export default AddMovieForm
