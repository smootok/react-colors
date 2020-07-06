import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { SortableElement } from 'react-sortable-hoc'

const useStyles = makeStyles({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px'
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
})

function DraggableColorBox ({ color, name, handleRemoveColor }) {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => handleRemoveColor(name)}
        />
      </div>
    </div>
  )
}

export default SortableElement(DraggableColorBox)
