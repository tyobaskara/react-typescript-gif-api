import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';
import get from 'lodash/get';
import SearchResultList from '../../components/search-result-list/search-result-list.component';

const Trendings: FC = () => {
  const [trendings, setTrendings] = useState({
    data: [],
    loading: false,
    error: ''
  });

  useEffect(() => {
    const fetchTrendings = async () => {
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=fY8IW6jYUjP1DOk82fYNPYNqfzWTxhrh&limit=20&offset=0`
      
      setTrendings(current => ({
        ...current,
        loading: true
      }));
      
      try {
        const result = await axios.get(url);
        const data: any = get(result, 'data.data', []);

        setTrendings(current => ({
          ...current,
          data,
          loading: false
        }));
      } catch (error) {
        setTrendings(current => ({
          ...current,
          loading: false,
          error: 'sww'
        }));
      }
    }

    fetchTrendings();
  }, []);

  const renderTrendings = () => (
    <SearchResultList
      result={trendings}
    />
  );

  return (
    <div>
      <h1>Trendings</h1>

      {renderTrendings()}
    </div>
  )
}

export default Trendings
