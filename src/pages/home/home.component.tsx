import React, { FC, useContext } from 'react';
import GifList from '../../components/gif-list/gif-list.component';
import GifListPagination, { GifListPaginationContext } from '../../contexts/gif-list-pagination/gif-list-pagination.component';
import SearchForm, { SearchContext } from '../../contexts/search-form/search-form.component';

const GifListComponent: FC = () => {
  // can't call useContext in Home bcause GifList Context rendered inside it
  const result = useContext(SearchContext); 
  const { offset, setOffset } = useContext(GifListPaginationContext);

  return (
    <GifList
      list={result}
      limit={10}
      offset={offset}
      setOffset={setOffset}
    />
  );
};

const SearchFormComponent: FC = () => {
  const { offset, setOffset } = useContext(GifListPaginationContext);

  return (
    <SearchForm
      offset={offset}
      setOffset={setOffset}
    >
      <GifListComponent />
    </SearchForm>
  )
}

const Home: FC = () => (
  <div className='container full'>
    <h1>Search GIFs</h1>

    <GifListPagination>
      <SearchFormComponent />
    </GifListPagination>
  </div>
);

export default Home
