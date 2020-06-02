import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, IconButton, Snackbar, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh'
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'lowercase',
    '& a': {
      textDecoration: 'none',
      color: 'black'
    }
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    '& .rc-slider-track': {
      backgroundColor: 'transparent'
    },
    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: '13px',
      height: '13px',
      marginTop: '-3px'
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem'
  }
})

export default function Navbar ({
  level,
  setLevel,
  colorFormat,
  setColorFormat,
  showAllColors
}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleColorFormatChange = e => {
    setColorFormat(e.target.value)
    setOpen(true)
  }

  return (
    <header className={classes.root}>
      <div className={classes.logo}>
        <Link to='/'>React Colors</Link>
      </div>
      {showAllColors && (
        <div>
          <span className={classes.level}>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              step={100}
              min={100}
              max={900}
              onAfterChange={level => setLevel(level)}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select value={colorFormat} onChange={handleColorFormatChange}>
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={
          <span id='message-id'>
            Format changed to {colorFormat.toUpperCase()}!
          </span>
        }
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
    </header>
  )
}
