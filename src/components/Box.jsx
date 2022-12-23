import React from 'react'

export const Box = ({ value, onClick}) => {
  const style = value === "X" ? "hover:shadow-lg bg-white rounded-sm shadow-md w-[5rem] h-[5rem] text-6xl font-bolder m-[0.5rem] leading-[5rem] text-red-600" : "hover:shadow-lg bg-white rounded-sm shadow-md w-[5rem] h-[5rem] text-6xl font-bolder m-[0.5rem] leading-[5rem] text-blue-600";
  
  return (
    <button className={style} onClick={onClick}>{value}</button>
  )
}
