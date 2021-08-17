import React, { FC, useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import GifList from '../../components/gif-list/gif-list.component';
import { SearchResult } from '../../contexts/search-form/search-form.component';
import GifListPagination, { GifListPaginationContext } from '../../contexts/gif-list-pagination/gif-list-pagination.component';

const Trendings: FC = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const { offset, setOffset } = useContext(GifListPaginationContext);
  const [trendings, setTrendings] = useState<SearchResult>({
    data: [],
    loading: false,
    error: '',
    totalCount: 0
  });

  const fetchTrendings = useCallback(async (offset) => {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=fY8IW6jYUjP1DOk82fYNPYNqfzWTxhrh&limit=10&offset=${offset}`
    
    setTrendings(current => ({
      ...current,
      loading: true
    }));
    
    try {
      const result = await axios.get(url);
      const data: any = get(result, 'data.data', []);
      const totalCount = get(result, 'data.pagination.total_count', 0);

      setTrendings(current => ({
        ...current,
        data: uniqBy(current.data.concat(data), 'id'),
        totalCount,
        loading: false
      }));
    } catch (error) {
      setTrendings(current => ({
        ...current,
        loading: false,
        error: 'sww'
      }));
    }
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
      fetchTrendings(offset);
    }
  }, [fetchTrendings, offset, shouldFetch]);

  useEffect(() => {
    setShouldFetch(true)
  }, [offset])

  return (
    <div>
      <h1>Trendings GIFs</h1>

      <GifList
        list={trendings}
        limit={10}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  )
};

const withPagination = () => (
  <GifListPagination>
    <Trendings />
  </GifListPagination>
);

export default withPagination
