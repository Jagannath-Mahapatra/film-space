import './navbar.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);
  const handleClick = () => {
    navigate('/');
  };

  const handleInfiniteScroll = () => {
    try {
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
    } catch (error) {
      navigate('/error');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  return (
    <div
      className='navbar'
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    >
      <img className='logo' src={logo} alt='Logo' onClick={handleClick} />
    </div>
  );
};

export default Navbar;
