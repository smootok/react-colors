import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PaletteList from './palette-list'
import Palette from './palette'
import MorePalette from './more-palette'
import NewPalette from './new-palette'
import palettesConfig from './palettes.config'
import { generatePalette } from './palettes.helpers'

export default function App () {
  const findPalette = id => {
    return palettesConfig.find(palette => {
      return palette.id === id
    })
  }

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <PaletteList palettes={palettesConfig} />}
      />
      <Route exact path='/palette/new' render={() => <NewPalette />} />
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
