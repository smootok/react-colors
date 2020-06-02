import React from 'react'
import { Link } from 'react-router-dom'

import ColorBox from './color-box'
import PaletteFooter from './palette-footer'
import Navbar from './navbar'

export default function MorePalette ({ palette, colorId }) {
  const [colorFormat, setColorFormat] = React.useState('hex')

  const gatherShades = (palette, colorId) => {
    let shades = []
    for (const key in palette.colors) {
      shades = [
        ...shades,
        ...palette.colors[key].filter(color => color.id === colorId)
      ]
    }
    return shades.slice(1)
  }

  const shades = gatherShades(palette, colorId)

  return (
    <div className='more-palette palette'>
      <Navbar
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
        showingAllColors={false}
      />
      <div className='palette-colors'>
        {shades.map(color => (
          <ColorBox
            key={color.name}
            id={color.id}
            name={color.name}
            background={color[colorFormat]}
            showLink={false}
          />
        ))}
        <Link to={`/palette/${palette.id}`}>
          <div className='color-box' style={{ backgroundColor: '#000' }}>
            <span className='back-button'>Go back</span>
          </div>
        </Link>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    </div>
  )
}
