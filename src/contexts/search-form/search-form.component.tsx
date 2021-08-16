import React, { useState, createContext, FC } from 'react'
import get from 'lodash/get';
import axios from 'axios';

export interface SearchResult {
  data: any[];
  loading: boolean;
  error: string;
}

export const SearchContext = createContext<SearchResult>({
  data: [],
  loading: false,
  error: ''
});

const SearchForm: FC = ({ children }) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState({
    data: [],
    loading: false,
    error: ''
  });
  
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  }

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      fetchSearch();
    }
  }

  const fetchSearch = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=fY8IW6jYUjP1DOk82fYNPYNqfzWTxhrh&q=${query}&limit=20&offset=0`;

    setSearchResult(current => ({
      ...current,
      loading: true
    }));
    try {
      const result = await axios.get(url);
      const data = get(result, 'data.data', []);

      setSearchResult(current => ({
        ...current,
        data,
        loading: false
      }));
    } catch (error) {

      setSearchResult(current => ({
        ...current,
        loading: false,
        error: 'sww'
      }));
    }
  }

  return (
    <SearchContext.Provider value={searchResult}>
      <form onSubmit={onSearchSubmit}>
        <input value={query} onChange={onInputChange}  />
        <button>Search</button>
      </form>

      {children}
    </SearchContext.Provider>
  )
}

export default SearchForm
