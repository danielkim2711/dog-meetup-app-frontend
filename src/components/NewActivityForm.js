import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const NewActivityForm = ({ loadedLoggedInUser }) => {
  const history = useHistory();

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();

  const [token] = useCookies(['myToken']);

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescriotion = descriptionInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;

    const activityData = {
      title: enteredTitle,
      description: enteredDescriotion,
      location: enteredLocation,
      user: loadedLoggedInUser.user_id,
    };

    console.log('Activity Data', activityData);

    axios
      .post(
        'https://dog-meetup-backend.herokuapp.com/api/activities/',
        activityData,
        {
          headers: {
            Authorization: `Token ${token['myToken']}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    history.push('/activities');
  };

  return (
    <div className='form__card'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Create New Activity</h1>
        <div className='control'>
          <label htmlFor='title'>Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className='control'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='10'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className='control'>
          <label htmlFor='location'>Location</label>
          <input type='text' required id='location' ref={locationInputRef} />
        </div>
        <div className='actions'>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewActivityForm;
