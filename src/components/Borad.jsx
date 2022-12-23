import React from 'react';
import { Box } from "./Box";

export const Borad = ({borad, onClick}) => {
  return (
    <div className='grid grid-cols-3 w-72 place-self-center justify-center mx-auto'>
        {borad.map((value, index) => {
            return <Box value={value} onClick={() => value === null && onClick(index)} /> 
        })}
    </div>
  )
}
