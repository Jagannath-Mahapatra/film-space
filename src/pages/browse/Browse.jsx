import { useParams } from 'react-router-dom';
import InfiniteScroll from '../../components/infiniteScroll/InfiniteScroll';
import './browse.scss';
import { useEffect, useState } from 'react';

const Browse = () => {
  const params = useParams();

  const [mediaType, setMediaType] = useState();

  useEffect(() => {
    setMediaType(params.media_type);
  }, [params.media_type]);

  return (
    <div>
      <InfiniteScroll
        fetchURL={`/discover/${mediaType}`}
        mediaType={mediaType}
      />
    </div>
  );
};

export default Browse;
