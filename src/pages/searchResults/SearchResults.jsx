import './searchResults.scss';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from '../../components/infiniteScroll/InfiniteScroll';

const SearchResults = () => {
  const { query } = useLocation().state;
  return (
    <InfiniteScroll query={query} fetchURL='/search/multi' mediaType='multi' />
  );
};

export default SearchResults;
