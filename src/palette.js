import React from 'react'

import './palette.css'
import ColorBox from './color-box'

export default function Palette ({ colors }) {
  return (
    <div className='palette'>
      <div className='palette-colors'>
        {colors.map(color => (
          <ColorBox
            key={color.color}
            name={color.name}
            background={color.color}
          />
        ))}
      </div>
    </div>
  )
}
