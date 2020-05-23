import React from 'react'

import Palette from './palette'
import palettesConfig from './palettes.config'
import { generatePalette } from './palettes.helpers'

console.log(generatePalette(palettesConfig[4]))

export default function App () {
  return (
    <div>
      <Palette palette={generatePalette(palettesConfig[4])} />
    </div>
  )
}
