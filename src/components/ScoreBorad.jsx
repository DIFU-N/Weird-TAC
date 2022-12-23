import React from 'react'

export const ScoreBorad = ({score, oPlaying}) => {
    const {xScore, oScore, tie} = score;
    const maybe = oPlaying === true ? "w-[100%] text-center p-[1rem_0] border-b-blue-600 border-b-[5px]" : "w-[100%] text-center p-[1rem_0] border-b-[5px]";
    const maybe2 = oPlaying === false ? "w-[100%] text-center p-[1rem_0] border-b-red-600 border-b-[5px] rounded-l-lg" : "w-[100%] text-center p-[1rem_0] border-b-[5px] rounded-l-lg";
    return (
        <div className='flex flex-row items-center justify-evenly w-[20rem] text-lg bg-white m-[3rem_auto] shadow-2xl rounded-lg'>
            <span className={maybe2}>X - {xScore}</span>
            <span className={maybe}>O - {oScore}</span>
            <span className='w-[100%] text-center p-[1rem_0] border-b-[5px] rounded-r-lg' >tie - {tie}</span>
        </div>
    )
}
