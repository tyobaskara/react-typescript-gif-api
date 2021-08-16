import React, { FC, useContext } from 'react';
import SearchResultList from '../../components/search-result-list/search-result-list.component';
import SearchForm, { SearchContext } from '../../contexts/search-form/search-form.component';

const SearchResult: FC = () => {
  const result = useContext(SearchContext);

  return (
    <SearchResultList
      result={result}
    />
  );
};

const Home: FC = () => (
  <div className='container'>
    <h1>Search</h1>

    <SearchForm>
      <SearchResult />
    </SearchForm>
  </div>
);

export default Home
