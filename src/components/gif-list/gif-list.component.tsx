import React, { FC, useCallback, useRef, useEffect } from 'react'
import { SearchResult } from '../../contexts/search-form/search-form.component'

import './gif-list.styles.scss';

interface ListProps {
  listData: SearchResult[];
}

const List: FC<ListProps> = ({ listData }) => (
  <ul className='gif-list'>
    {listData.map((item: any, index: number) => {
      const { id, title, images: { downsized } } = item;
      console.log('list index', index);

      return (
        <li key={id}>
          <img src={downsized.url} alt={title}/>
        </li>
      )
    })}
  </ul>
);

function compare (prevProps: ListProps, nextProps: ListProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

const MemoizedList = React.memo(List, compare);

interface GifListProps {
  list: SearchResult;
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const GifList: FC<GifListProps> = ({ list, limit, offset, setOffset }) => {
  const { data, loading, error, totalCount } = list;
  const loaderCheckpointRef = useRef<HTMLSpanElement>(null);

  console.log('gif-list-component rendered', list);
  
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

  const renderList = () => data.length ? (
    <MemoizedList listData={data} />
  ) : null;

  const renderLoaderCheckpoint = () => offset < totalCount 
    ? (<span ref={loaderCheckpointRef}/>) : null;

  const renderContent = () => (
    <div>
      {error && <p>{error}</p>}
      {renderList()}
      {!loading && renderLoaderCheckpoint()}
      {loading && (<p>loading</p>)}
    </div>
  );

  return renderContent();
}

export default GifList
