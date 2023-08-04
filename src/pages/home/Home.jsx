import CarouselList from '../../components/carousel/carouselList';
import './home.scss';
import Search from './search/Search';

const Home = () => {
  return (
    <div className='homepage'>
      <Search />
      <CarouselList
        heading='Upcoming Movies'
        url='/movie/upcoming'
        mediaType='movie'
      />
      <CarouselList
        heading='Popular Movies'
        url='/movie/popular'
        mediaType='movie'
      />
      <CarouselList
        heading='Top Rated Movies'
        url='/movie/top_rated'
        mediaType='movie'
      />
      <CarouselList
        heading='On The Air TV Shows'
        url='/tv/on_the_air'
        mediaType='tv'
      />
      <CarouselList
        heading='Popular TV Shows'
        url='/tv/popular'
        mediaType='tv'
      />
      <CarouselList
        heading='Top Rated TV Shows'
        url='/tv/top_rated'
        mediaType='tv'
      />
    </div>
  );
};

export default Home;
