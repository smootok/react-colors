import React from 'react'

import './palette.css'
import ColorBox from './color-box'
import Navbar from './navbar'
import PaletteFooter from './palette-footer'

export default function Palette ({
  palette: { id, colors, paletteName, emoji }
}) {
  const [level, setLevel] = React.useState(500)
  const [colorFormat, setColorFormat] = React.useState('hex')

  return (
    <div className='palette'>
      <Navbar
        level={level}
        setLevel={setLevel}
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
        showAllColors
      />
      <div className='palette-colors'>
        {colors[level].map(color => (
          <ColorBox
            key={color.id}
            id={color.id}
            name={color.name}
            background={color[colorFormat]}
            paletteId={id}
            colorFormat={colorFormat}
            setColorFormat={setColorFormat}
            showLink
          />
        ))}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  )
}
