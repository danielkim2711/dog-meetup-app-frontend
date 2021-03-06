import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Components
import DogsList from '../components/DogsList';

const DogsPage = ({ loadedLoggedInUser }) => {
  const [token] = useCookies(['myToken']);

  const [dogsList, setDogsList] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    axios
      .get('https://dog-meetup-backend.herokuapp.com/api/dogs/', {
        headers: {
          Authorization: `Token ${token['myToken']}`,
        },
      })
      .then((res) => {
        const dogs = [];
        res.data.forEach((dog) =>
          dog.user === loadedLoggedInUser.user_id
            ? dogs.push(dog)
            : console.log('Error occured to forEach')
        );
        setDogsList(dogs);
      })
      .catch((err) => console.log('Error! :', err));
  };

  return (
    <section className='dogs__section'>
      <h1>My Dogs</h1>
      {dogsList.length !== 0 ? (
        <DogsList dogsList={dogsList} loadedLoggedInUser={loadedLoggedInUser} />
      ) : (
        <h1>There are currently no registered dogs yet!</h1>
      )}
      <Link to='/newdogs' className='nav__link remove-underline'>
        <div className='floating-button'>+</div>
      </Link>
    </section>
  );
};

export default DogsPage;
