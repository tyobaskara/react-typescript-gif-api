import React, { FC } from 'react'
import { SearchResult } from '../../contexts/search-form/search-form.component'

interface SearchResultListProps {
  result: SearchResult
}

const SearchResultList: FC<SearchResultListProps> = ({ result }) => {
  const { data, loading, error } = result;
  console.log('SearchResultList rendered', result);

  const renderList = () => {
    return data.length ? (
      <ul>
        {data.map((item: any) => {
          const { id, title, images: { original } } = item;

          return (
            <li key={id}>
              <img src={original.url} alt={title}/>
            </li>
          )
        })}
      </ul>
    ) : null;
  }

  const renderResult = () => loading ? (<p>loading</p>) : (
    <div>
      {error && <p>{error}</p>}
      {renderList()}
    </div>
  );

  return renderResult();
}

export default SearchResultList
