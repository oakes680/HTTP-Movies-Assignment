import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  id:'',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();

  console.log('yo this is idddd', id)

  const changeHandler = e => {
    setItem({
      ...item,
      id: id,
      [e.target.name]: e.target.value
    });
  };

  const starsHandler = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value.split(',')
    });
  };



  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        console.log('thisisform', res.data);
        props.history.push("/")
      })
      .catch(err => console.log(err)); 
  };

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
        <button type='submit'> change it</button>
      </form>
    </div>
  );
};

export default UpdateForm;
