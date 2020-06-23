import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px'
  }
})

export default function DraggableColorBox ({ color }) {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}
