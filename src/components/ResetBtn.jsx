import React from 'react'

export const ResetBtn = ({resetBorad}) => {
  return (
    <button className='rounded-lg bg-blue-800 text-white text-4xl p-[1rem] items-center justify-center' onClick={resetBorad}>reset</button>
  )
}
