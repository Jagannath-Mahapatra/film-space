import './navbar.scss';
import { useEffect, useState, useRef } from 'react';
import logo from '../../assets/logo.png';
import { MdDashboard } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [opacity, setOpacity] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [browseMobileMaxHeight, setBrowseMobileMaxHeight] = useState('0');
  const mobileBrowseContainer = useRef();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleOpacityChange = () => {
    if (document.documentElement.scrollTop > 50) {
      setOpacity(0.8);
    } else {
      setOpacity(1);
    }
    if (
      document.documentElement.scrollTop >
      document.documentElement.scrollHeight / 2
    ) {
      setOpacity(0);
    }
  };

  const handleScreenSizeChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleOpacityChange);
    window.addEventListener('resize', handleScreenSizeChange);

    return () => {
      window.removeEventListener('scroll', handleOpacityChange);
      window.removeEventListener('resize', handleScreenSizeChange);
    };
  }, []);

  const handleBrowseMovies = () => {
    setBrowseMobileMaxHeight('0');
  };

  const handleBrowseTVShows = () => {
    setBrowseMobileMaxHeight('0');
  };

  const handleCollapsibleClick = () => {
    if (browseMobileMaxHeight !== '0') {
      setBrowseMobileMaxHeight('0');
    } else {
      setBrowseMobileMaxHeight(mobileBrowseContainer.current.scrollHeight);
    }
  };

  return (
    <>
      <div
        className='navbar'
        style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
      >
        <div className='logo-container'>
          <img
            className='logo'
            src={logo}
            alt='Logo'
            onClick={handleLogoClick}
          />
        </div>
        {screenWidth > 425 && (
          <div className='browse-container-desktop'>
            <Link
              to='/browse/movie'
              state={{ mediaType: 'movie' }}
              onClick={handleBrowseMovies}
            >
              Browse Movies
            </Link>
            <Link
              to='/browse/tv'
              state={{ mediaType: 'tv' }}
              onClick={handleBrowseTVShows}
            >
              Browse TV Shows
            </Link>
          </div>
        )}
        {screenWidth <= 425 && (
          <div className='toggle-browse-mobile' ref={mobileBrowseContainer}>
            <button onClick={handleCollapsibleClick}>
              <MdDashboard
                className={browseMobileMaxHeight !== '0' ? 'rotated' : 'normal'}
              />
            </button>
          </div>
        )}
      </div>
      {screenWidth <= 425 && (
        <div
          className='browse-container-mobile'
          style={{
            maxHeight: browseMobileMaxHeight,
            opacity,
            pointerEvents: opacity === 0 ? 'none' : 'auto',
          }}
        >
          <Link
            to='/browse/movie'
            state={{ mediaType: 'movie' }}
            onClick={handleBrowseMovies}
          >
            Browse Movies
          </Link>
          <Link
            to='/browse/tv'
            state={{ mediaType: 'tv' }}
            onClick={handleBrowseTVShows}
          >
            Browse TV Shows
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
