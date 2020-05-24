import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './navbar.css'

export default function Navbar ({ level, setLevel }) {
  return (
    <header className='navbar'>
      <div className='logo'>
        <a href='#'>React Colors</a>
      </div>
      <div className='slider-container'>
        <span className='level'>Level: {level}</span>
        <div className='slider'>
          <Slider
            defaultValue={level}
            step={100}
            min={100}
            max={900}
            onAfterChange={level => setLevel(level)}
          />
        </div>
      </div>
    </header>
  )
}
