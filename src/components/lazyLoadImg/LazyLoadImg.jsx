import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './lazyLoadImg.scss';
import placeholder from '../../assets/grey-loading-placeholder.png';

const LazyLoadImg = ({ src, alt = '', style, placeholder }) => {
  return (
    <LazyLoadImage
      style={style}
      alt={alt}
      src={src}
      effect='blur'
      className='lazy-image'
      placeholderSrc={placeholder}
    />
  );
};

export default LazyLoadImg;
