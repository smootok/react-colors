import React from 'react'
import { makeStyles } from '@material-ui/styles'

import ColorBox from './color-box'
import Navbar from './navbar'
import PaletteFooter from './palette-footer'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  colors: {
    height: '90%'
  }
})

export default function Palette ({
  palette: { id, colors, paletteName, emoji }
}) {
  const classes = useStyles()
  const [level, setLevel] = React.useState(500)
  const [colorFormat, setColorFormat] = React.useState('hex')

  return (
    <div className={classes.root}>
      <Navbar
        level={level}
        setLevel={setLevel}
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
        showAllColors
      />
      <div className={classes.colors}>
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
