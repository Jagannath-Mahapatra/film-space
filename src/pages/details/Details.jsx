import { useEffect, useState } from 'react';
import './details.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import LazyLoadImg from '../../components/lazyLoadImg/LazyLoadImg';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Rating, StickerStar } from '@smastrom/react-rating';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/pagination';
import profileImagePlaceholder from '../../assets/profile-image-placeholder.png';
import posterPlaceholder from '../../assets/poster-placeholder.jpg';
import CarouselList from '../../components/carousel/CarouselList';
import SeasonList from './SeasonList/SeasonList';

const Details = () => {
  const { fetchUrl, mediaType } = useLocation().state;
  const { imageBaseUrl, videosQueryParam, youtubeEndpoint } = useSelector(
    (state) => state.configuration
  );
  const { data, error, loading } = useFetch('/' + fetchUrl + videosQueryParam);
  const navigate = useNavigate();
  const credits = useFetch('/' + fetchUrl + '/credits');
  const [trailerURL, setTrailerURL] = useState('');

  if (error) {
    navigate('/error');
  }

  const [mediaDetails, setMediaDetails] = useState({});
  const releaseDate =
    mediaType === 'movie'
      ? mediaDetails?.release_date
      : mediaDetails?.first_air_date;

  useEffect(() => {
    setMediaDetails(data);
    const setTrailer = () => {
      const videos = data?.videos?.results;
      const trailerVideo =
        videos?.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        ) ??
        videos?.find(
          (video) => video.site === 'YouTube' && video.type === 'Teaser'
        );
      return trailerVideo?.key;
    };
    setTrailerURL(youtubeEndpoint + setTrailer());
  }, [data]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className='details-container'>
      <div className='details-first-container'>
        <div className='poster-wrapper'>
          <LazyLoadImg
            style={{ borderRadius: '0.5rem' }}
            src={
              mediaDetails?.poster_path
                ? imageBaseUrl + mediaDetails?.poster_path
                : posterPlaceholder
            }
          />
        </div>
        <div className='other-details'>
          <p className='media-name'>
            <Link to={mediaDetails?.homepage}>
              {mediaDetails?.title ??
                mediaDetails?.original_title ??
                mediaDetails?.name}
            </Link>
          </p>
          <div className='rating-container'>
            <div className='rating-image'>
              <Rating
                value={mediaDetails?.vote_average / 2 ?? 0}
                items={5}
                radius='small'
                itemStyles={{
                  itemShapes: StickerStar,
                  activeFillColor: '#b100ff',
                  inactiveFillColor: '00adb5',
                }}
                readOnly
              />
            </div>
            <span>({mediaDetails?.vote_count} ratings)</span>
          </div>
          <p className='synopsis'>{mediaDetails?.overview}</p>
          <div className='genres-container'>
            {mediaDetails?.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className='release-date-container'>
            {mediaType === 'movie' ? (
              <span>
                Release Date: {dayjs(releaseDate).format('DD MMMM, YYYY')}
              </span>
            ) : (
              <span>
                First Air Date: {dayjs(releaseDate).format('DD MMMM, YYYY')}
              </span>
            )}
          </div>
          {mediaType === 'tv' && (
            <div className='season-detail-container'>
              <span>No. of seasons: {mediaDetails?.number_of_seasons}</span>
              <span>No. of episodes: {mediaDetails?.number_of_episodes}</span>
            </div>
          )}
        </div>
      </div>
      <div className='details-second-container'>
        <div className='trailer-container'>
          <span>TRAILER</span>
          <div className='player-wrapper'>
            <iframe
              width='100%'
              height='100%'
              src={trailerURL}
              allowFullScreen={true}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            />
          </div>
        </div>
        {mediaType === 'tv' && (
          <div className='season-list-container'>
            <span className='seasons-heading'>SEASONS</span>
            {mediaDetails?.seasons?.map((season, number) => (
              <SeasonList
                key={number}
                seasonNumber={number}
                seasonDetails={season}
              />
            ))}
          </div>
        )}
        <div className='credits-carousel'>
          <span className='credits-heading'>CAST</span>
          <div className='credits-swiper'>
            <Swiper
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className='mySwiper'
              spaceBetween={8}
              slidesPerView={2}
              slidesPerGroup={2}
              breakpoints={{
                425: {
                  slidesPerView: 3,
                  slidesPerGroup: 4,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 5,
                  slidesPerGroup: 6,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 7,
                  slidesPerGroup: 8,
                  spaceBetween: 30,
                },
                2000: {
                  slidesPerView: 10,
                  slidesPerGroup: 10,
                  spaceBetween: 50,
                },
              }}
            >
              {credits?.data?.cast?.map((cast) => {
                return (
                  <SwiperSlide key={cast.id}>
                    <div className='credit-cast-image'>
                      <LazyLoadImg
                        style={{
                          borderRadius: '0.5rem',
                          maxWidth: '10rem',
                          maxHeight: '10rem',
                          objectFit: 'cover',
                        }}
                        src={
                          cast?.profile_path
                            ? imageBaseUrl + cast?.profile_path
                            : profileImagePlaceholder
                        }
                      />
                    </div>
                    <span>
                      {cast.name} <i>({cast.character})</i>
                    </span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className='similar-media'>
          <CarouselList
            heading={
              mediaType === 'movie' ? 'Similar Movies' : 'Similar TV Shows'
            }
            url={'/' + fetchUrl + '/similar'}
            mediaType={mediaType}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
