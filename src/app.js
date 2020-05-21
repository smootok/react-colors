import React from 'react'

import Palette from './palette'
import palettesConfig from './palettes.config'

export default function App () {
  return (
    <div>
      <Palette {...palettesConfig[4]} />
    </div>
  )
}
