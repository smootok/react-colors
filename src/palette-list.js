import React from 'react'
import { Link } from 'react-router-dom'

export default function PaletteList ({ palettes }) {
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map(palette => (
        <div key={palette.id}>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </div>
      ))}
    </div>
  )
}
