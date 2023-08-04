import LazyLoadImg from '../lazyLoadImg/LazyLoadImg';
import './carouselList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Navigation } from 'swiper';
import 'swiper/scss/navigation';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import CarouselButton from './carouselButton/CarouselButton';
import useFetch from '../../hooks/useFetch';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import posterPlaceholder from '../../assets/poster-placeholder.jpg';
import { Link, redirect } from 'react-router-dom';
import placeholder from '../../assets/grey-loading-placeholder.png';

const CarouselList = ({ heading, url, mediaType }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const { data, loading, error } = useFetch(url);
  const imageBaseUrl = useSelector((state) => state.configuration.imageBaseUrl);

  useEffect(() => {
    if (error) {
      redirect('/error');
    }
    setFetchedData(data?.results);
  }, [data]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className='carousel-container'>
      <h1>{heading}</h1>
      <Swiper
        autoHeight={true}
        navigation={true}
        rewind={true}
        modules={[Navigation]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={5}
        breakpoints={{
          425: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 6,
            spaceBetween: 40,
          },
          2000: {
            slidesPerView: 8,
            slidesPerGroup: 8,
            spaceBetween: 60,
          },
        }}
      >
        <CarouselButton slideDirection='left' slot='container-start'>
          <MdNavigateBefore style={{ fill: '#ffffff' }} />
        </CarouselButton>
        {fetchedData?.map((fetchedItem) => (
          <SwiperSlide key={fetchedItem.id}>
            <LazyLoadImg
              src={
                fetchedItem.poster_path
                  ? imageBaseUrl + fetchedItem.poster_path
                  : posterPlaceholder
              }
              alt='poster-image'
              style={{
                borderRadius: '0.25rem',
                boxShadow: '0.1rem 0.1rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5)',
                margin: '0.5rem 0',
              }}
              placeholder={placeholder}
            />
            <Link
              className='poster-title-link'
              to={`../../${mediaType}/${fetchedItem.id}`}
              state={{
                fetchUrl: `${mediaType}/${fetchedItem.id}`,
                mediaType: mediaType,
              }}
            >
              {fetchedItem.title ?? fetchedItem.name}
            </Link>
          </SwiperSlide>
        ))}
        <CarouselButton slideDirection='right' slot='container-end'>
          <MdNavigateNext style={{ fill: '#ffffff' }} />
        </CarouselButton>
      </Swiper>
    </div>
  );
};

export default CarouselList;
