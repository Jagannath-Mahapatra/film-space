import React from 'react';
import './pageNotFound.scss';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='error-page'>
      <span>404</span>
      <p>Oops! Something went wrong!</p>
      <p>This page could not be found.</p>
      <p>Please check your internet connection and the URL.</p>
      <Link className='homepage-link' to='/'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
