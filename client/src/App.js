import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddMovieForm from './Movies/AddMovieForm'


const App = (props) => {
  const [savedList, setSavedList] = useState([]);
 

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  const [items, setItems] = useState([]);
  
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/movies')
  //     .then(res =>  {
  //       setItems(res.data)
  //       console.log('yo we here ',res.data)
  //     })
    
  //     .catch(error => console.log(error));
  // }, []);
  const handleEdit = e => {
    e.preventDefault();
    console.log('asdsadsa')
    props.history.push(`/add-movie`);
  };



  return (
    <>
      <SavedList list={savedList} />
      
      <Route 
      exact path="/" 
      render={props => {
        return <MovieList {...props} />
      }}
/>
      



      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route  path='/update-movie/:id'
      render={props => {
        console.log('my fffff props', props)
        return <UpdateForm  {...props} items={items} setItems={setItems}/>
      }}  />

      <Route path='/add-movie'
        render={props => {
          return <AddMovieForm {...props} items={items} setItems={setItems} />
        }} />

    </>
  );
};

export default App;
