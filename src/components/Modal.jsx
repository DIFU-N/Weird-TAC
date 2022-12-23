import React from 'react'

const Modal = () => {
  return (
    <div>
        <div>
            <h2></h2>
            <h3></h3>
            <label htmlFor="">
                <input type="radio" name="difficulty" id="r0" value="0" /> easy&nbsp;
            </label>
            <label htmlFor="">
                <input type="radio" name="difficulty" id="r1" value="1" checked/> hard
            </label>
            <br />
            <h3></h3>
            <label htmlFor="">
                <input input type="radio" name="player" id="rx" value="x" checked /> X (Go First)&nbsp;
            </label>
            <label htmlFor="">
                <input type="radio" name="player" id="ro" value="o" /> O
            </label>
            <br />
            <button>Play</button>
        </div>
    </div>
  )
}

export default Modal