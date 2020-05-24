import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './palette.css'
import ColorBox from './color-box'

export default function Palette ({ palette }) {
  const [level, setLevel] = React.useState(500)

  return (
    <div className='palette'>
      <div className='slider'>
        <Slider
          defaultValue={level}
          step={100}
          min={100}
          max={900}
          onAfterChange={level => setLevel(level)}
        />
      </div>

      <div className='palette-colors'>
        {palette.colors[level].map(color => (
          <ColorBox key={color.hex} name={color.name} background={color.hex} />
        ))}
      </div>
    </div>
  )
}
