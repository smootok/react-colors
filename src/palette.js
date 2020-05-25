import React from 'react'

import './palette.css'
import ColorBox from './color-box'
import Navbar from './navbar'

export default function Palette ({ palette }) {
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
        {palette.colors[level].map(color => (
          <ColorBox key={color.hex} name={color.name} background={color[colorFormat]} />
        ))}
      </div>
    </div>
  )
}
