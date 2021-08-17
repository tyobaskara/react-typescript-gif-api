import React, { FC, useCallback, useRef, useEffect } from 'react'
import { SearchResult } from '../../contexts/search-form/search-form.component'

import './gif-list.styles.scss';

interface GifListProps {
  list: SearchResult;
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const GifList: FC<GifListProps> = ({ list, limit, offset, setOffset }) => {
  const { data, loading, error, totalCount } = list;
  const loaderCheckpointRef = useRef<HTMLDivElement>(null);

  console.log('gif-list-component rendered');
  
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && setOffset) {
      setOffset(current => current + limit);
    }
  }, [limit, setOffset]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 0
    });

    if (loaderCheckpointRef.current) {
        observer.observe(loaderCheckpointRef.current);
    }
  }, [handleObserver, data]);

  const renderList = () => {
    const isRenderLoader = offset < totalCount;

    return data.length ? (
      <ul className='gif-list'>
        {data.map((item: any, index) => {
          const { id, title, images: { downsized } } = item;
          const isLastIndex = index === (data.length - 1);

          return (
            <li key={id}>
              <img src={downsized.url} alt={title}/>
              {isLastIndex && isRenderLoader && <span ref={loaderCheckpointRef}/>}
            </li>
          )
        })}
      </ul>
    ) : null;
  }

  const renderContent = () => (
    <div>
      {error && <p>{error}</p>}
      {renderList()}
      {loading && (<p>loading</p>)}
    </div>
  );

  return renderContent();
}

export default GifList
