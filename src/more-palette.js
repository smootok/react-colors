import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import ColorBox from './color-box'
import PaletteFooter from './palette-footer'
import Navbar from './navbar'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  colors: {
    height: '90%'
  },
  goBack: {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    opacity: 1,
    backgroundColor: '#000',
    '& a': {
      color: '#fff',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: 'center',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none'
    }
  }
})

export default function MorePalette ({ palette, colorId }) {
  const [colorFormat, setColorFormat] = React.useState('hex')
  const classes = useStyles()

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
    <div className={classes.root}>
      <Navbar
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
        showingAllColors={false}
      />
      <div className={classes.colors}>
        {shades.map(color => (
          <ColorBox
            key={color.name}
            id={color.id}
            name={color.name}
            background={color[colorFormat]}
            showLink={false}
          />
        ))}
        <div className={classes.goBack}>
          <Link to={`/palette/${palette.id}`}>Go Back</Link>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    </div>
  )
}
