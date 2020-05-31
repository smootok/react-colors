import React from 'react'

import './palette.css'
import ColorBox from './color-box'
import Navbar from './navbar'

export default function Palette ({ palette: { id, colors, paletteName, emoji } }) {
  const [level, setLevel] = React.useState(500)
  const [colorFormat, setColorFormat] = React.useState('hex')

  return (
    <div className='palette'>
      <Navbar
        level={level}
        setLevel={setLevel}
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
      />
      <div className='palette-colors'>
        {colors[level].map(color => (
          <ColorBox
            key={color.id}
            id={color.id}
            name={color.name}
            background={color[colorFormat]}
            paletteId={id}
            showLink
          />
        ))}
      </div>
      <footer className='palette-footer'>
        {paletteName}
        <span className='emoji'>{emoji}</span>
      </footer>
    </div>
  )
}
