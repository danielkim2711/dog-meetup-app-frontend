import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Components
import Activities from '../components/Activities';

const ActivityPage = ({ loadedLoggedInUser, loadedProfile }) => {
  const [token] = useCookies(['myToken']);

  const [loadedActivities, setLoadedActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    axios
      .get('https://dog-meetup-backend.herokuapp.com/api/activities/', {
        headers: {
          Authorization: `Token ${token['myToken']}`,
        },
      })
      .then((res) => {
        setLoadedActivities(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className='activity__section'>
      <h1>Available Activities Right Now!</h1>
      {loadedActivities.length !== 0 ? (
        <Activities
          loadedActivities={loadedActivities}
          loadedLoggedInUser={loadedLoggedInUser}
          loadedProfile={loadedProfile}
        />
      ) : (
        <h1>There are currently no available activities</h1>
      )}
    </section>
  );
};

export default ActivityPage;
