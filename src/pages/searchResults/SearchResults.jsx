import { useEffect, useState } from 'react';
import './searchResults.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { fetchDataFromAPI } from '../../utils/api';
import LazyLoadImg from '../../components/lazyLoadImg/LazyLoadImg';
import posterPlaceholder from '../../assets/poster-placeholder.jpg';
import { useSelector } from 'react-redux';
import InfiniteScroll from '../../components/infiniteScroll/InfiniteScroll';

// '/search/multi'
const SearchResults = () => {
  const { query } = useLocation().state;
  return <InfiniteScroll query={query} fetchURL='/search/multi' />;
};

export default SearchResults;
