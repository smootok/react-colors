import React from 'react'

import ColorBox from './color-box'

export default function MorePalette ({ palette, colorId }) {
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
    <div className='palette'>
      <div className='palette-colors'>
        {shades.map(color => (
          <ColorBox
            key={color.hex}
            id={color.id}
            name={color.name}
            background={color.hex}
            showLink={false}
          />
        ))}
      </div>
    </div>
  )
}
