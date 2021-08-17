import React, { useState, createContext, FC, useEffect, useCallback } from 'react'
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import axios from 'axios';

export interface SearchResult {
  data: any[];
  loading: boolean;
  error: string;
  totalCount: number;
}

export const SearchContext = createContext<SearchResult>({
  data: [],
  loading: false,
  error: '',
  totalCount: 0
});

interface SearchFormProps {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm: FC<SearchFormProps> = ({ children, offset, setOffset }) => {
  const [query, setQuery] = useState('');
  const [shouldFetch, setShouldFetch] = useState({
    fetch: false,
    reset: false
  });
  const [searchResult, setSearchResult] = useState<SearchResult>({
    data: [],
    loading: false,
    error: '',
    totalCount: 0
  });
  console.log('search-form-component rendered');
  
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  }

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      setOffset(0);
      setShouldFetch({
        fetch: true,
        reset: true
      });
    }
  }

  const fetchSearch = useCallback(async (offset: number) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=fY8IW6jYUjP1DOk82fYNPYNqfzWTxhrh&q=${query}&limit=10&offset=${offset}`;

    setSearchResult(current => ({
      ...current,
      loading: true
    }));

    try {
      const result = await axios.get(url);
      const data = get(result, 'data.data', []);
      const totalCount = get(result, 'data.pagination.total_count', 0);

      setSearchResult(current => ({
        ...current,
        data: shouldFetch.reset ? uniqBy(data, 'id') : uniqBy(current.data.concat(data), 'id'),
        totalCount,
        loading: false
      }));
    } catch (error) {

      setSearchResult(current => ({
        ...current,
        loading: false,
        error: 'sww'
      }));
    }
  }, [query, shouldFetch.reset]);

  // should fetch onSubmit or shouldFetch true
  useEffect(() => {
    if (shouldFetch.fetch) {
      setShouldFetch({
        fetch: false,
        reset: false
      });
      fetchSearch(offset);
    }
  }, [fetchSearch, offset, shouldFetch.fetch])

  // should fetch on next page
  useEffect(() => {
    if (offset > 0 ) {
      setShouldFetch({
        fetch: true,
        reset: false
      });
    }
  }, [offset])

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
