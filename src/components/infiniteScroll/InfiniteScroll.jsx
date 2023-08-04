import { useEffect, useState } from 'react';
import './infiniteScroll.scss';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { fetchDataFromAPI } from '../../utils/api';
import LazyLoadImg from '../../components/lazyLoadImg/LazyLoadImg';
import posterPlaceholder from '../../assets/poster-placeholder.jpg';
import { useSelector } from 'react-redux';

const InfiniteScroll = ({ query, fetchURL }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [renderedMedia, setRenderedMedia] = useState([]);
  const { imageBaseUrl } = useSelector((state) => state.configuration);

  const getMediaData = async (url) => {
    const res = await fetchDataFromAPI(url, {
      query,
      page: currentPage,
    });
    const data = res?.results;
    setRenderedMedia((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  useEffect(() => {
    getMediaData(fetchURL);
  }, [currentPage]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 10
      ) {
        setLoading(true);
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => {}, 1000);
      }
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <div className='data-container'>
      {!loading && renderedMedia.length === 0 && (
        <div className='no-results'>
          <p>No results found!</p>
          <Link className='homepage-link' to='/'>
            Go to Homepage
          </Link>
        </div>
      )}
      <div className='media-list-container'>
        {renderedMedia
          ?.filter((result) => result?.media_type !== 'person')
          ?.map((result) => (
            <div key={result.id} className='media-card'>
              <div className='media-poster'>
                <LazyLoadImg
                  src={
                    result?.poster_path
                      ? imageBaseUrl + result?.poster_path
                      : posterPlaceholder
                  }
                  alt='media-poster'
                  placeholder={posterPlaceholder}
                />
              </div>
              <Link
                className='media-link'
                to={`../../${result?.media_type}/${result?.id}`}
                state={{
                  fetchUrl: `${result?.media_type}/${result?.id}`,
                  mediaType: result?.media_type,
                }}
              >
                {result?.title ?? result?.name}
              </Link>
            </div>
          ))}
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default InfiniteScroll;
