import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import MiniPalette from './mini-palette'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'blue',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  nav: {
    display: 'flex',
    padding: '10px 0',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    '& a': {
      color: '#fff'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem'
  }
})

export default function PaletteList ({ palettes }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette key={palette.id} {...palette} />
          ))}
        </div>
      </div>
    </div>
  )
}
