import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './lazyLoadImg.scss';

const LazyLoadImg = ({ src, alt = '', style, placeholder }) => {
  return (
    <LazyLoadImage
      style={style}
      alt={alt}
      src={src}
      effect='blur'
      className='lazy-image'
      placeholderSrc={placeholder}
      // placeholderSrc={src}
    />
  );
};

export default LazyLoadImg;
