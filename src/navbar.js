import React from 'react'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './navbar.css'

export default function Navbar ({
  level,
  setLevel,
  colorFormat,
  setColorFormat
}) {
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
      <div className='select-container'>
        <Select
          value={colorFormat}
          onChange={e => setColorFormat(e.target.value)}
        >
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </header>
  )
}
