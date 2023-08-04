import './search.scss';
import { useEffect, useState } from 'react';
import LazyLoadImg from '../../../components/lazyLoadImg/LazyLoadImg';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import { MdSearch } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import placeholder from '../../../assets/grey-loading-placeholder-landscape.png';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const imageBaseUrl = useSelector((state) => state.configuration.imageBaseUrl);
  const [backdropImagesData, setBackdropImagesData] = useState([]);
  const [query, setQuery] = useState('');

  const { data } = useFetch('/trending/all/day');
  const navigate = useNavigate();

  useEffect(() => {
    setBackdropImagesData(data?.results);
  }, [data, imageBaseUrl]);

  const searchOnEnter = (event) => {
    const keyCode = event.keyCode;
    if (keyCode !== 13) {
      return;
    }
    navigate(`search/${query}`, { state: { query } });
  };
  const searchOnClick = () => {
    navigate(`search/${query}`, { state: { query } });
  };

  return (
    <div className='search-wrapper'>
      <div className='backdrop-image-wrapper'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {backdropImagesData?.map((backdropImagesItem) => (
            <SwiperSlide key={backdropImagesItem.id}>
              <LazyLoadImg
                src={imageBaseUrl + backdropImagesItem?.backdrop_path}
                alt='backdropImage'
                style={{
                  opacity: '50%',
                  filter: 'blur(0.025rem)',
                }}
                placeholder={placeholder}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='input-wrapper'>
        <input
          type='text'
          className='search-input'
          onInput={() => setQuery(event.target.value)}
          onKeyDown={searchOnEnter}
        />
        <button className='search-button' onClick={searchOnClick}>
          <MdSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
