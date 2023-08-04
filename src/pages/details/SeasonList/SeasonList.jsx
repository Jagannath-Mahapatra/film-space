import React, { useState, useRef } from 'react';
import './seasonList.scss';
import { MdPlayArrow } from 'react-icons/md';
import LazyLoadImg from '../../../components/lazyLoadImg/LazyLoadImg';
import { useSelector } from 'react-redux';
import posterPlaceholder from '../../../assets/poster-placeholder.jpg';
import dayjs from 'dayjs';

const SeasonList = ({ seasonNumber, seasonDetails }) => {
  const { imageBaseUrl } = useSelector((state) => state.configuration);
  const [maxHeight, setMaxHeight] = useState('0');
  const episodeList = useRef();
  const handleCollapsibleClick = () => {
    if (maxHeight !== '0') {
      setMaxHeight('0');
    } else {
      setMaxHeight(episodeList.current.scrollHeight);
    }
  };
  return (
    <>
      <button
        type='button'
        className='collapsible-button'
        onClick={handleCollapsibleClick}
        expanded={maxHeight !== '0' ? 'true' : 'false'}
      >
        <span>{seasonDetails?.name}</span>
        <MdPlayArrow
          color='$secondary-color'
          className={maxHeight !== '0' ? 'down' : 'right'}
        />
      </button>
      <div
        className='collapsible-content'
        ref={episodeList}
        style={{ maxHeight }}
      >
        <div className='episode-poster'>
          <LazyLoadImg
            src={
              seasonDetails?.poster_path
                ? imageBaseUrl + seasonDetails?.poster_path
                : posterPlaceholder
            }
            alt='poster'
            placeholder={posterPlaceholder}
          />
        </div>
        <div className='more-details'>
          {seasonDetails?.overview ? (
            <p>{seasonDetails?.overview}</p>
          ) : (
            <p>Overview for this season is unavailable.</p>
          )}
          <p>No. of episodes: {seasonDetails?.episode_count ?? '0'}</p>
          <p>
            Air date: {dayjs(seasonDetails?.air_date).format('DD MMMM, YYYY')}
          </p>
        </div>
      </div>
    </>
  );
};

export default SeasonList;
