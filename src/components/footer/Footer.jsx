import './footer.scss';
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiOutlineMail,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer'>
      <a href='#' className='github-link'>
        <AiFillGithub />
      </a>
      <a href='#' className='facebook-link'>
        <AiFillFacebook />
      </a>
      <a href='#' className='instagram-link'>
        <AiFillInstagram />
      </a>
      <a href='#' className='email-link'>
        <AiOutlineMail />
      </a>
    </div>
  );
};

export default Footer;
