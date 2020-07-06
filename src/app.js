import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PaletteList from './palette-list'
import Palette from './palette'
import MorePalette from './more-palette'
import NewPalette from './new-palette'
import palettesConfig from './palettes.config'
import { generatePalette } from './palettes.helpers'

export default function App () {
  const [palettes, setPalettes] = React.useState(palettesConfig)

  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id
    })
  }

  const savePalette = newPalette => {
    setPalettes(palettes => [...palettes, newPalette])
  }

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <PaletteList palettes={palettes} />}
      />
      <Route exact path='/palette/new' render={() => <NewPalette palettes={palettes} savePalette={savePalette} />} />
      <Route
        exact
        path='/palette/:id'
        render={props => (
          <Palette
            palette={generatePalette(findPalette(props.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={props => (
          <MorePalette
            colorId={props.match.params.colorId}
            palette={generatePalette(findPalette(props.match.params.paletteId))}
          />
        )}
      />
    </Switch>
  )
}
