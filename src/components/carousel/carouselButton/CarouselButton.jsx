import './carouselButton.scss';
import { useSwiper } from 'swiper/react';

const CarouselButton = ({ slideDirection, children }) => {
  const swiper = useSwiper();
  return (
    <button
      className='carousel-button'
      onClick={() =>
        slideDirection === 'right' ? swiper.slideNext() : swiper.slidePrev()
      }
      style={slideDirection === 'right' ? { right: 0 } : { left: 0 }}
    >
      {children}
    </button>
  );
};
export default CarouselButton;
