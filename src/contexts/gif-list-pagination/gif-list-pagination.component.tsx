import React, { createContext, FC, useState } from 'react'

interface GifListPaginationContextProp {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const GifListPaginationContext = createContext<GifListPaginationContextProp>({
  offset: 0,
  setOffset: () => {}
});

const GifListPagination: FC = ({ children }) => {
  const [offset, setOffset] = useState(0);
  console.log('gif-list-pagination rendered');

  return (
    <GifListPaginationContext.Provider value={{offset, setOffset}}>
      {children}
    </GifListPaginationContext.Provider>
  )
}

export default GifListPagination
